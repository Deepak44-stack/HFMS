import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, ShieldCheck, Loader2, Building2, GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { OtpInput } from "@/components/auth/OtpInput";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const isIdentifier = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || /^\d{10}$/.test(v.trim());

function Field({ id, label, error, children }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-medium text-error">{error}</p>
      )}
    </div>
  );
}

function PasswordInput({ id, value, onChange, placeholder, invalid, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-err` : undefined}
        className={cn("pr-12", invalid && "border-error")}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-ink"
      >
        {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

/**
 * UI-only auth flow. There is no backend: every "send" and "verify" just advances the screen.
 * Steps: form -> otp -> done            (login / register)
 *        forgot -> otp -> reset -> done (forgot password)
 */
export default function Auth() {
  const { t, signIn } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mode = pathname === "/register" ? "register" : "login";

  const [step, setStep] = useState("form");
  const [flow, setFlow] = useState("auth"); // auth | forgot
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [accountRole, setAccountRole] = useState("customer");

  // Switching between Log in / Create account resets the flow.
  useEffect(() => {
    setStep("form"); setFlow("auth"); setErrors({}); setOtp("");
  }, [mode]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const fake = (next, afterOtp = false) => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep(next);
      if (next === "otp") { setOtp(""); setCooldown(30); }
      if (afterOtp) setOtp("");
    }, 650);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const errs = {};
    if (mode === "register" && name.trim().length < 2) errs.name = t("auth.errName");
    if (!isIdentifier(identifier)) errs.identifier = t("auth.errIdentifier");
    if (password.length < 8) errs.password = t("auth.errPassword");
    setErrors(errs);
    if (Object.keys(errs).length === 0) fake("otp");
  };

  const submitForgot = (e) => {
    e.preventDefault();
    if (!isIdentifier(identifier)) return setErrors({ identifier: t("auth.errIdentifier") });
    setErrors({});
    fake("otp");
  };

  const submitOtp = (e) => {
    e.preventDefault();
    if (otp.length < 6) return setErrors({ otp: t("auth.errOtp") });
    setErrors({});
    if (flow !== "forgot") signIn({ name: name || identifier.split("@")[0] || "HFMS member", identifier, role: accountRole });
    fake(flow === "forgot" ? "reset" : "done");
  };

  const submitReset = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) return setErrors({ password: t("auth.errPassword") });
    setErrors({});
    fake("done");
  };

  const startForgot = () => { setFlow("forgot"); setStep("forgot"); setErrors({}); };
  const backToLogin = () => { setFlow("auth"); setStep("form"); setErrors({}); };

  const title = {
    form: mode === "login" ? t("auth.welcome") : t("auth.createTitle"),
    forgot: t("auth.forgotTitle"),
    otp: t("auth.otpTitle"),
    reset: t("auth.forgotTitle"),
    done: t("auth.doneTitle"),
  }[step];

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">
      {/* Brand panel — desktop only */}
      <aside className="pattern-dhaka relative hidden flex-col justify-end p-12 text-white lg:flex">
        <ShieldCheck className="mb-5 h-10 w-10 text-accent" aria-hidden="true" />
        <p className="max-w-md font-display text-4xl font-semibold leading-tight">{t("hero.title")}</p>
        <p className="mt-4 max-w-md text-white/85">{t("footer.trust")}.</p>
      </aside>

      <div className="flex items-start justify-center px-4 py-8 sm:px-6 sm:py-12 lg:items-center">
        <div className="w-full max-w-md">
          {(step === "form" || step === "forgot") && step === "form" && (
            <div role="tablist" aria-label="Account" className="mb-6 grid grid-cols-2 rounded-xl border border-line bg-surface p-1">
              {[
                { to: "/login", label: t("auth.login"), on: mode === "login" },
                { to: "/register", label: t("auth.register"), on: mode === "register" },
              ].map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  role="tab"
                  aria-selected={tab.on}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-lg text-sm font-semibold",
                    tab.on ? "bg-primary text-primary-foreground shadow-soft" : "text-muted hover:text-ink"
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          )}

          {step === "otp" || step === "forgot" || step === "reset" ? (
            <button
              type="button"
              onClick={() => (step === "otp" ? (flow === "forgot" ? setStep("forgot") : setStep("form")) : backToLogin())}
              className="mb-4 inline-flex items-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {step === "otp" ? t("auth.change") : t("auth.back")}
            </button>
          ) : null}

          <h1 className="text-3xl font-semibold">{title}</h1>

          {step === "form" && (
            <>
              <p className="mt-2 text-muted">{mode === "login" ? t("auth.loginSub") : t("auth.registerSub")}</p>
              <form onSubmit={submitForm} noValidate className="mt-6 space-y-4">
                {mode === "register" && (
                  <Field id="name" label={t("auth.name")} error={errors.name}>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.namePh")} autoComplete="name"
                      aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={cn(errors.name && "border-error")} />
                  </Field>
                )}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-ink">{mode === "register" ? "I want to" : "Sign in as"}</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[{ value: "customer", label: "Find a hostel", icon: GraduationCap }, { value: "owner", label: "Manage a hostel", icon: Building2 }, ...(mode === "login" ? [{ value: "admin", label: "HFMS administrator", icon: Shield }] : [])].map(({ value, label, icon: Icon }) => (
                      <button key={value} type="button" onClick={() => setAccountRole(value)} aria-pressed={accountRole === value} className={cn("flex items-center gap-2 rounded-lg border p-3 text-left text-sm font-semibold", accountRole === value ? "border-primary bg-primary-soft text-primary" : "border-line text-ink hover:border-primary/40")}>
                        <Icon className="h-4 w-4" /> {label}
                      </button>
                    ))}
                  </div>
                  {mode === "login" && <p className="mt-2 text-xs text-muted">Demo mode: choose the account type you want to preview.</p>}
                </fieldset>
                <Field id="identifier" label={t("auth.identifier")} error={errors.identifier}>
                  <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={t("auth.identifierPh")} autoComplete="username"
                    aria-invalid={!!errors.identifier} aria-describedby={errors.identifier ? "identifier-err" : undefined} className={cn(errors.identifier && "border-error")} />
                </Field>
                <Field id="password" label={t("auth.password")} error={errors.password}>
                  <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("auth.passwordPh")}
                    invalid={!!errors.password} autoComplete={mode === "login" ? "current-password" : "new-password"} />
                </Field>
                {mode === "login" && (
                  <div className="text-right">
                    <button type="button" onClick={startForgot} className="rounded py-1 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                      {t("auth.forgot")}
                    </button>
                  </div>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {mode === "login" ? t("auth.login") : t("auth.register")}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted">
                {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <Link to={mode === "login" ? "/register" : "/login"} className="font-semibold text-primary underline-offset-4 hover:underline">
                  {mode === "login" ? t("auth.register") : t("auth.login")}
                </Link>
              </p>
            </>
          )}

          {step === "forgot" && (
            <>
              <p className="mt-2 text-muted">{t("auth.forgotSub")}</p>
              <form onSubmit={submitForgot} noValidate className="mt-6 space-y-4">
                <Field id="identifier" label={t("auth.identifier")} error={errors.identifier}>
                  <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={t("auth.identifierPh")} autoComplete="username"
                    aria-invalid={!!errors.identifier} aria-describedby={errors.identifier ? "identifier-err" : undefined} className={cn(errors.identifier && "border-error")} />
                </Field>
                <Button type="submit" size="lg" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {t("auth.send")}
                </Button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="mt-2 text-muted">
                {t("auth.otpSent")} <span className="font-semibold text-ink">{identifier || "—"}</span>
              </p>
              <form onSubmit={submitOtp} noValidate className="mt-6 space-y-4">
                <OtpInput value={otp} onChange={(v) => { setOtp(v); if (errors.otp) setErrors({}); }} invalid={!!errors.otp} />
                {errors.otp && <p role="alert" className="text-sm font-medium text-error">{errors.otp}</p>}
                <p className="rounded-lg bg-accent-soft px-3 py-2 text-sm text-[#6b4300]">{t("auth.otpHint")}</p>
                <Button type="submit" size="lg" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {t("auth.verify")}
                </Button>
                <div className="text-center text-sm">
                  {cooldown > 0 ? (
                    <span className="text-muted" aria-live="polite">{t("auth.resendIn")} {cooldown}s</span>
                  ) : (
                    <button type="button" onClick={() => setCooldown(30)} className="rounded py-1 font-semibold text-primary underline-offset-4 hover:underline">
                      {t("auth.resend")}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

          {step === "reset" && (
            <form onSubmit={submitReset} noValidate className="mt-6 space-y-4">
              <Field id="new-password" label={t("auth.newPassword")} error={errors.password}>
                <PasswordInput id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={t("auth.passwordPh")}
                  invalid={!!errors.password} autoComplete="new-password" />
              </Field>
              <Button type="submit" size="lg" className="w-full" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {t("auth.setPassword")}
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-soft" role="status">
              <CheckCircle2 className="mx-auto h-14 w-14 text-success" aria-hidden="true" />
              <p className="mt-3 text-muted">{flow === "forgot" ? t("auth.doneReset") : t("auth.doneSub")}</p>
              <Button size="lg" className="mt-5 w-full" onClick={() => (flow === "forgot" ? backToLogin() : navigate(accountRole === "customer" ? "/search" : "/dashboard"))}>
                {flow === "forgot" ? t("auth.login") : t("auth.browse")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
