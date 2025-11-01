"use client";

import React, { useMemo, useState } from "react";
import {
  Loader2,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";

type IndicatorType = "phone" | "email" | "url";

type LookupResult = {
  type: IndicatorType;
  value: string;
  malicious?: boolean;
  confidence?: number; // 0..1
  status?: string; // verified | unverified | whitelisted | not_found
  tags?: string[];
  sources?: Array<{ name: string; externalId?: string; confidence?: number }>;
  first_seen?: string;
  last_seen?: string;
  advice?: string;
  error?: string;
};

const TABS: {
  key: IndicatorType;
  label: string;
  placeholder: string;
  examples: string[];
}[] = [
  {
    key: "phone",
    label: "Numéro de téléphone",
    placeholder: "+1 514 555 0000",
    examples: ["+15145550000"],
  },
  {
    key: "email",
    label: "Email",
    placeholder: "exemple@domaine.com",
    examples: ["contact@exemple.ca"],
  },
  {
    key: "url",
    label: "URL",
    placeholder: "https://exemple.com",
    examples: ["https://fake-rent-mtl.example"],
  },
];

export default function QuickSearchSection() {
  const [tab, setTab] = useState<IndicatorType>("phone");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = useMemo(() => TABS.find((t) => t.key === tab)!, [tab]);

  async function handleLookup(v?: string) {
    const input = (v ?? value).trim();
    if (!input) return;

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: tab, value: input }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Erreur lors de la vérification");
      } else {
        setResult(data);
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  const confidencePct = Math.round((result?.confidence ?? 0) * 100);

  return (
    <section className="relative isolate bg-foreground py-14 text-white">
      {/* subtle grid / glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% 20%, rgba(0,255,153,0.06), transparent 60%), radial-gradient(800px 400px at 10% 90%, rgba(0,255,153,0.04), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
          opacity: 0.25,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15">
            <Shield className="h-4 w-4 text-emerald-300" />
            Vérification instantanée — Téléphone, Email, URL
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Vérifiez avant de faire confiance
          </h2>
          <p className="mt-3 text-white/80">
            Entrez un numéro, un email ou un lien. Nous renvoyons un niveau de
            risque, la confiance et des conseils pratiques.
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto mt-8 w-full max-w-4xl rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur md:p-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  setResult(null);
                  setError(null);
                  setValue("");
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  tab === t.key
                    ? "bg-primary text-black font-semibold"
                    : "bg-white/10 text-white/90 hover:bg-white/15"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Input + CTA */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              placeholder={current.placeholder}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-emerald-400/50"
              aria-label={`Entrer ${current.label.toLowerCase()}`}
            />
            <button
              onClick={() => handleLookup()}
              disabled={loading || !value.trim()}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Vérification…
                </>
              ) : (
                "Vérifier"
              )}
            </button>
          </div>

          {/* Example quick-fill */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="opacity-80">Essayer&nbsp;:</span>
            {current.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setValue(ex);
                  handleLookup(ex);
                }}
                className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/15"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Result / Error */}
          <div className="mt-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-200 ring-1 ring-red-400/30">
                {error}
              </div>
            )}

            {result && !error && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Résultat</p>
                    <h3 className="text-lg font-semibold text-white">
                      {result.type.toUpperCase()} • {result.value}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.malicious ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-200 ring-1 ring-red-400/30">
                        <ShieldAlert className="h-4 w-4" /> Risque élevé
                      </span>
                    ) : result.status === "not_found" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 ring-1 ring-white/20">
                        <AlertTriangle className="h-4 w-4" /> Inconnu
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200 ring-1 ring-emerald-400/30">
                        <CheckCircle2 className="h-4 w-4" /> Faible risque
                      </span>
                    )}
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Confiance</span>
                    <span>{confidencePct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        confidencePct >= 70
                          ? "bg-red-400"
                          : confidencePct >= 40
                          ? "bg-yellow-300"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${confidencePct}%` }}
                    />
                  </div>
                </div>

                {/* Advice */}
                {result.advice && (
                  <p className="mt-3 text-sm text-white/80">{result.advice}</p>
                )}

                {/* Tags / Sources */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {(result.tags ?? []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80"
                    >
                      #{t}
                    </span>
                  ))}
                  {result.sources && result.sources.length > 0 && (
                    <span className="ml-auto text-xs text-white/50">
                      Sources: {result.sources.map((s) => s.name).join(", ")}
                    </span>
                  )}
                </div>

                {/* Timestamps */}
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/50 md:grid-cols-4">
                  <div>
                    Première détection:{" "}
                    {result.first_seen
                      ? new Date(result.first_seen).toLocaleDateString()
                      : "—"}
                  </div>
                  <div>
                    Dernière activité:{" "}
                    {result.last_seen
                      ? new Date(result.last_seen).toLocaleDateString()
                      : "—"}
                  </div>
                  <div>Statut: {result.status ?? "—"}</div>
                  <div>Malicious: {String(result.malicious ?? false)}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Small reassurance line */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-white/60">
          Nous ne partageons jamais vos informations personnelles. Les résultats
          sont fournis avec un niveau de confiance et des sources pour la
          transparence.
        </p>
      </div>
    </section>
  );
}
