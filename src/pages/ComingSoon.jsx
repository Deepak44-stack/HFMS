import { Link, useSearchParams } from "react-router-dom";
import { Hammer } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

/** Placeholder for routes that are built in a later phase (Search, Compare, details, info pages). */
export default function ComingSoon() {
  const { t } = useApp();
  const [params] = useSearchParams();
  const entries = [...params.entries()];
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <EmptyState
        icon={Hammer}
        title={t("states.comingTitle")}
        description={t("states.comingDesc")}
        action={
          <Button asChild>
            <Link to="/">{t("states.backHome")}</Link>
          </Button>
        }
      />
      {entries.length > 0 && (
        <div className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm">
          <p className="font-semibold">{t("states.yourSearch")}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-muted">
            {entries.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-medium text-ink">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
