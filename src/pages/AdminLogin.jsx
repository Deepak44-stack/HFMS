import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";

export default function AdminLogin() {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("admin@demo.com");
  const [password, setPassword] = useState("demo1234");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("credentials");
  const [error, setError] = useState("");
  const [failed, setFailed] = useState(Number(localStorage.getItem("hfms.adminFailed") || 0));

  const submitCredentials = (event) => {
    event.preventDefault();
    const lockUntil = Number(localStorage.getItem("hfms.adminLockUntil") || 0);
    if (lockUntil > Date.now()) {
      setError(`Account locked. Try again in ${Math.ceil((lockUntil - Date.now()) / 60000)} minutes.`);
      return;
    }
    if (identifier !== "admin@demo.com" || password !== "demo1234") {
      const next = failed + 1;
      setFailed(next);
      localStorage.setItem("hfms.adminFailed", String(next));
      if (next >= 5) localStorage.setItem("hfms.adminLockUntil", String(Date.now() + 15 * 60 * 1000));
      setError(next >= 5 ? "Account locked for 15 minutes after 5 failed attempts." : "Admin credentials are not valid.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const submitOtp = (event) => {
    event.preventDefault();
    if (otp !== "123456") {
      setError("Incorrect OTP. Use 123456 in demo mode.");
      return;
    }
    localStorage.removeItem("hfms.adminFailed");
    signIn({ name: "Demo Admin", identifier, role: "admin" });
    navigate("/admin");
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-brand-mark"><ShieldCheck size={24} /></div>
        <p className="admin-kicker">HFMS PLATFORM STAFF</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">Manage hostel verification, complaints and marketplace quality.</p>
        {step === "credentials" ? (
          <form onSubmit={submitCredentials} className="admin-form">
            <div><Label htmlFor="admin-identifier">Email or phone</Label><Input id="admin-identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoComplete="username" /></div>
            <div><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></div>
            {error && <p className="admin-error" role="alert">{error}</p>}
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        ) : (
          <form onSubmit={submitOtp} className="admin-form">
            <div><Label htmlFor="admin-otp">One-time password</Label><Input id="admin-otp" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456" /></div>
            {error && <p className="admin-error" role="alert">{error}</p>}
            <Button type="submit" className="w-full">Verify and open portal</Button>
            <button type="button" className="admin-link" onClick={() => { setStep("credentials"); setError(""); }}>Use different credentials</button>
          </form>
        )}
        <div className="admin-demo-note"><strong>Demo account</strong><br />admin@demo.com / demo1234<br />OTP: 123456</div>
      </div>
    </div>
  );
}
