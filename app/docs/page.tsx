"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Shield,
  PlugZap,
  Code,
  Clock,
  Zap,
  KeyRound,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import QuebecFlag from "@/components/common/QuebecFlag";

/** ---------- Helpers ---------- */
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="whitespace-pre-wrap rounded-xl bg-black/60 p-4 text-xs text-white ring-1 ring-text/10">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/30 px-3 py-1 text-xs ring-1 ring-text/15">
        <Icon className="h-4 w-4 text-emerald-300" />
        {title}
      </div>
      <div className="space-y-3 text-text/85">{children}</div>
    </section>
  );
}

type IndicatorType = "phone" | "email" | "url";
type LookupResult = {
  type: IndicatorType;
  value: string;
  malicious?: boolean;
  confidence?: number;
  status?: string;
  advice?: string;
  tags?: string[];
  sources?: Array<{ name: string }>;
  first_seen?: string;
  last_seen?: string;
  error?: string;
};

/** ---------- Simple tabs for code samples ---------- */
function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: { label: string; content: React.ReactNode }[];
  initial?: number;
}) {
  const [i, setI] = useState(initial);
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            onClick={() => setI(idx)}
            className={`rounded-full px-3 py-1 text-xs ${
              idx === i
                ? "bg-primary text-black font-semibold"
                : "bg-card/30 text-text/80 hover:bg-card/30"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[i].content}</div>
    </div>
  );
}

/** ---------- Live Playground (uses Next proxy /api/lookup) ---------- */
function Playground() {
  const [type, setType] = useState<IndicatorType>("phone");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<LookupResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setErr(null);
    setRes(null);
    try {
      const r = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value: value.trim() }),
      });
      const data = await r.json();
      if (!r.ok) setErr(data?.error || "Erreur de l’API");
      else setRes(data);
    } catch {
      setErr("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  const confidence = Math.round((res?.confidence ?? 0) * 100);

  return (
    <div className="rounded-2xl border border-text/20 bg-card/5 p-4">
      <div className="grid gap-3 md:grid-cols-[160px_1fr_auto]">
        <div className="flex gap-2">
          {(["phone", "email", "url"] as IndicatorType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full px-3 py-2 text-xs ${
                type === t
                  ? "bg-primary text-black font-semibold"
                  : "bg-card/30 text-text/90 hover:bg-card/30"
              }`}
            >
              {t === "phone" ? "Téléphone" : t === "email" ? "Email" : "URL"}
            </button>
          ))}
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            type === "phone"
              ? "+15145550000"
              : type === "email"
              ? "contact@exemple.ca"
              : "https://exemple.com"
          }
          onKeyDown={(e) => e.key === "Enter" && run()}
          className="rounded-xl border border-text/20 bg-card/5 px-3 py-2 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
        />
        <button
          onClick={run}
          disabled={loading || !value.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-black ring-1 ring-emerald-500/40 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tester
            </>
          ) : (
            "Tester"
          )}
        </button>
      </div>

      <div className="mt-3 text-xs text-text/60">
        Astuce: Essayez{" "}
        <button className="underline" onClick={() => setValue("+15145550000")}>
          +15145550000
        </button>{" "}
        ou{" "}
        <button
          className="underline"
          onClick={() => setValue("https://fake-rent-mtl.example")}
        >
          https://fake-rent-mtl.example
        </button>
      </div>

      {err && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-600 ring-1 ring-red-400/30">
          <AlertTriangle className="h-4 w-4" /> {err}
        </div>
      )}

      {res && !err && (
        <div className="mt-3 rounded-xl border border-text/20 bg-card/5 p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text">
              <span className="font-semibold">{res.type?.toUpperCase()}</span> •{" "}
              {res.value}
            </div>
            <div>
              {res.malicious ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-600 ring-1 ring-red-400/30">
                  <Shield className="h-3 w-3" /> Risque élevé
                </span>
              ) : res.status === "not_found" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-card/30 px-2 py-1 text-xs text-text/80 ring-1 ring-text/20">
                  <Info className="h-3 w-3" /> Inconnu
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-600 ring-1 ring-emerald-400/30">
                  <CheckCircle2 className="h-3 w-3" /> Faible risque
                </span>
              )}
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between text-[11px] text-text/60">
              <span>Risque</span>
              <span>{confidence}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-card/30">
              <div
                className={`h-2 rounded-full ${
                  confidence >= 70
                    ? "bg-red-400"
                    : confidence >= 40
                    ? "bg-yellow-300"
                    : "bg-emerald-400"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
          {res.advice && (
            <p className="mt-2 text-xs text-text/80">{res.advice}</p>
          )}
        </div>
      )}
    </div>
  );
}

/** ---------- Page ---------- */
export default function DocsPage() {
  return (
    <main className="relative isolate bg-foreground text-text">
      {/* background grid/glow */}
      {/* Hero */}
      <div className="relative overflow-hidden">
        <QuebecFlag />
        <header className="mx-auto relative max-w-3xl text-center py-14 overflow-hidden">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/30 px-3 py-1 text-xs ring-1 ring-text/15">
            <PlugZap className="h-4 w-4 text-emerald-300" />
            API publique — Sécurité Québec (SecuriQC)
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            API & Documentation
          </h1>
          <p className="mt-3 text-text/80">
            Vérifiez un numéro, un email ou une URL, soumettez un signalement et
            intégrez ces protections à vos applications. Simple, rapide,
            sécurisé.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text/60">
            <span className="inline-flex items-center gap-1">
              <KeyRound className="h-3 w-3" /> Auth: clé API (en-tête{" "}
              <code className="rounded bg-card/30 px-1">x-api-key</code>)
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> Rate limit: 120 requêtes/min
            </span>
          </div>
        </header>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
        {/* TOC */}
        <nav className="mx-auto mt-8 max-w-3xl">
          <ul className="flex flex-wrap items-center justify-center gap-3 text-xs text-black">
            <li>
              <a
                href="#quickstart"
                className="rounded-full bg-green-300 px-3 py-1 hover:bg-card/30"
              >
                Quickstart
              </a>
            </li>
            <li>
              <a
                href="#auth"
                className="rounded-full bg-primary px-3 py-1 hover:bg-card/30"
              >
                Auth
              </a>
            </li>
            <li>
              <a
                href="#endpoints"
                className="rounded-full bg-red-300 px-3 py-1 hover:bg-card/30"
              >
                Endpoints
              </a>
            </li>
            <li>
              <a
                href="#playground"
                className="rounded-full bg-primary px-3 py-1 hover:bg-card/30"
              >
                Playground
              </a>
            </li>
            <li>
              <a
                href="#errors"
                className="rounded-full bg-green-300 px-3 py-1 hover:bg-card/30"
              >
                Erreurs
              </a>
            </li>
            <li>
              <a
                href="#webhooks"
                className="rounded-full bg-primary/80 px-3 py-1 hover:bg-card/30"
              >
                Webhooks (à venir)
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="rounded-full bg-red-300 px-3 py-1 hover:bg-card/30"
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        <div className="mx-auto mt-10 grid gap-12">
          {/* Quickstart */}
          <Section id="quickstart" title="Quickstart" icon={Zap}>
            <p>Installez et configurez :</p>
            <CodeBlock>
              {`# Express API déjà en cours sur http://localhost:3000
# Dans Next.js (.env.local)
BLACKLIST_API_URL=http://localhost:3000
BLACKLIST_API_KEY=demo_key_123

# Endpoint proxy côté Next (déjà fourni) :
# app/api/lookup/route.ts (POST {type,value}) -> appelle /v1/lookup
# app/api/report/route.ts (POST {...}) -> appelle /v1/report`}
            </CodeBlock>
            <p>Exemple de requête directe (sans proxy) :</p>
            <Tabs
              tabs={[
                {
                  label: "cURL",
                  content: (
                    <CodeBlock>
                      {`curl -H "x-api-key: demo_key_123" \
  "http://localhost:3000/v1/lookup?type=phone&value=%2B15145550000"`}
                    </CodeBlock>
                  ),
                },
                {
                  label: "Node (fetch)",
                  content: (
                    <CodeBlock>
                      {`const res = await fetch("http://localhost:3000/v1/lookup?type=phone&value=%2B15145550000", {
  headers: { "x-api-key": "demo_key_123" },
});
const data = await res.json();`}
                    </CodeBlock>
                  ),
                },
                {
                  label: "Python",
                  content: (
                    <CodeBlock>
                      {`import requests
r = requests.get("http://localhost:3000/v1/lookup",
  headers={"x-api-key":"demo_key_123"},
  params={"type":"phone","value":"+15145550000"})
print(r.json())`}
                    </CodeBlock>
                  ),
                },
              ]}
            />
          </Section>

          {/* Auth */}
          <Section id="auth" title="Authentification" icon={KeyRound}>
            <p>
              Utilisez une clé API dans l’en-tête{" "}
              <code className="rounded bg-card/30 px-1">x-api-key</code>. Pour
              la démo, la clé par défaut est{" "}
              <code className="rounded bg-card/30 px-1">demo_key_123</code>{" "}
              (configure dans{" "}
              <code className="rounded bg-card/30 px-1">.env</code>).
            </p>
            <CodeBlock>
              {`GET /v1/lookup?type=phone&value=%2B15145550000
x-api-key: YOUR_API_KEY`}
            </CodeBlock>
          </Section>

          {/* Endpoints */}
          <Section id="endpoints" title="Endpoints" icon={BookOpen}>
            <div className="rounded-2xl border border-text/20 bg-card/5 p-4">
              <h3 className="text-lg font-semibold">GET /v1/lookup</h3>
              <p className="text-text/80">
                Rechercher un indicateur (phone | email | url | domain | ip).
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-text/80">
                <li>
                  Query: <code className="rounded bg-card/30 px-1">type</code>{" "}
                  (requis),{" "}
                  <code className="rounded bg-card/30 px-1">value</code>{" "}
                  (requis)
                </li>
                <li>
                  Retour:{" "}
                  <code className="rounded bg-card/30 px-1">malicious</code>,{" "}
                  <code className="rounded bg-card/30 px-1">confidence</code>{" "}
                  (0..1),{" "}
                  <code className="rounded bg-card/30 px-1">status</code>, etc.
                </li>
              </ul>
              <CodeBlock>
                {`GET /v1/lookup?type=phone&value=%2B15145550000
{
  "type": "phone",
  "value": "+15145550000",
  "malicious": true,
  "confidence": 0.82,
  "status": "unverified",
  "advice": "Avoid / block. If you already sent money, contact your bank."
}`}
              </CodeBlock>
            </div>

            <div className="mt-6 rounded-2xl border border-text/20 bg-card/5 p-4">
              <h3 className="text-lg font-semibold">POST /v1/report</h3>
              <p className="text-text/80">
                Créer un signalement (victime / communauté).
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-text/80">
                <li>
                  Body JSON requis:{" "}
                  <code className="rounded bg-card/30 px-1">type</code>{" "}
                  (phone/email/url),{" "}
                  <code className="rounded bg-card/30 px-1">value</code>
                </li>
                <li>
                  Optionnel:{" "}
                  <code className="rounded bg-card/30 px-1">description</code>,{" "}
                  <code className="rounded bg-card/30 px-1">city</code>,{" "}
                  <code className="rounded bg-card/30 px-1">evidence[]</code>
                </li>
              </ul>
              <Tabs
                tabs={[
                  {
                    label: "cURL",
                    content: (
                      <CodeBlock>
                        {`curl -X POST "http://localhost:3000/v1/report" \\
  -H "x-api-key: demo_key_123" -H "Content-Type: application/json" \\
  -d '{"type":"url","value":"https://fake-rent-mtl.example","description":"Kijiji demande de crypto","city":"Montréal"}'`}
                      </CodeBlock>
                    ),
                  },
                  {
                    label: "Réponse",
                    content: (
                      <CodeBlock>
                        {`{
  "id": "R-AB12CD34EF",
  "status": "unverified",
  "indicator": { "id": "...", "type": "url", "value": "https://fake-rent-mtl.example", "confidence": 0.5 }
}`}
                      </CodeBlock>
                    ),
                  },
                ]}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-text/20 bg-card/5 p-4">
              <h3 className="text-lg font-semibold">
                GET /v1/reports/{`{id}`}
              </h3>
              <p className="text-text/80">
                Récupérer l’état d’un signalement via l’identifiant public.
              </p>
              <CodeBlock>
                {`GET /v1/reports/R-AB12CD34EF
{
  "reportId": "R-AB12CD34EF",
  "status": "unverified",
  "createdAt": "2025-10-31T19:02:11.123Z",
  "indicator": { "type": "url", "value": "https://fake-rent-mtl.example", "status": "unverified", "confidence": 0.5 }
}`}
              </CodeBlock>
            </div>
          </Section>

          {/* Playground */}
          <Section id="playground" title="Playground (Live)" icon={Terminal}>
            <p className="text-text/80">
              Testez l’API sans exposer votre clé — ce playground utilise le
              proxy <code className="rounded bg-card/30 px-1">/api/lookup</code>
              .
            </p>
            <Playground />
          </Section>

          {/* Errors */}
          <Section id="errors" title="Erreurs & schéma" icon={AlertTriangle}>
            <p>Erreurs courantes :</p>
            <ul className="list-inside list-disc text-sm text-text/80">
              <li>
                <code className="rounded bg-card/30 px-1">401</code> — clé
                absente/incorrecte
              </li>
              <li>
                <code className="rounded bg-card/30 px-1">400</code> —
                paramètres invalides (Zod validation côté API)
              </li>
              <li>
                <code className="rounded bg-card/30 px-1">429</code> — rate
                limit dépassée (120/min)
              </li>
              <li>
                <code className="rounded bg-card/30 px-1">500</code> — erreur
                serveur
              </li>
            </ul>
            <p className="mt-2 text-text/80">Format d’erreur :</p>
            <CodeBlock>
              {`{
  "error": "Validation failed",
  "issues": [{ "path": ["query","type"], "message": "Invalid enum value" }]
}`}
            </CodeBlock>
          </Section>

          {/* Webhooks */}
          <Section id="webhooks" title="Webhooks (bientôt)" icon={Code}>
            <p>
              À venir : webhooks d’événements (nouveau signalement, indicateur
              vérifié, changement de statut).
            </p>
            <ul className="list-inside list-disc text-sm text-text/80">
              <li>
                Abonnement par{" "}
                <code className="rounded bg-card/30 px-1">/v1/webhooks</code>{" "}
                (POST)
              </li>
              <li>Signature HMAC</li>
              <li>Retentatives + DLQ</li>
            </ul>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ" icon={Info}>
            <p className="text-text/80">
              <strong>Q:</strong> Comment obtenir une clé API ?<br />
              <strong>R:</strong> Créez un compte (bientôt) ou contactez-nous;
              en démo: utilisez{" "}
              <code className="rounded bg-card/30 px-1">demo_key_123</code>.
            </p>
            <p className="text-text/80">
              <strong>Q:</strong> Les données sont-elles publiques ?<br />
              <strong>R:</strong> Les indicateurs normalisés
              (numéros/emails/URLs) et métadonnées agrégées sont consultables;
              les informations personnelles (email du rapporteur, fichiers
              privés) ne sont jamais exposées.
            </p>
            <p className="text-text/80">
              <strong>Q:</strong> Puis-je utiliser l’API dans une extension
              navigateur ?<br />
              <strong>R:</strong> Oui, passez par un proxy backend pour ne pas
              exposer la clé API.
            </p>
          </Section>

          {/* Footer CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/30 px-3 py-1 text-xs ring-1 ring-text/15">
              <BookOpen className="h-4 w-4 text-emerald-300" />
              Prêt à intégrer ?
            </div>
            <h3 className="mt-2 text-2xl font-bold">Commencez en 2 minutes</h3>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/verify"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black ring-1 ring-emerald-500/40"
              >
                Essayer une vérification
              </Link>
              <Link
                href="/report"
                className="rounded-full bg-card/30 px-5 py-2 text-sm ring-1 ring-text/15 hover:bg-card/30"
              >
                Envoyer un signalement
              </Link>
              <Link
                href="/docs"
                className="rounded-full bg-card/30 px-5 py-2 text-sm ring-1 ring-text/15 hover:bg-card/30"
              >
                Ouvrir Swagger
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-text/50">
          © {new Date().getFullYear()} SecuriQC — API publique, rate limit 120
          req/min. Vie privée respectée.
        </div>
      </div>
    </main>
  );
}
