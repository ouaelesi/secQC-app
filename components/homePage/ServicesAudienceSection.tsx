"use client";

import {
  ShieldAlert,
  MessageSquareWarning,
  FileWarning,
  LifeBuoy,
  Search,
  CheckCircle2,
  Bell,
  Code,
  PlugZap,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesAudienceSection() {
  return (
    <section className="relative isolate bg-foreground text-text">
      {/* subtle grid / glow */}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/30 px-3 py-1 text-xs ring-1 ring-white/15">
            <ShieldAlert className="h-4 w-4 text-emerald-300" />
            Pour qui ? Pour tous au Québec.
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Ce que nous offrons — victimes, citoyens, développeurs
          </h2>
          <p className="mt-3 text-text/80">
            Vérifiez, signalez et intégrez la protection dans vos applications.
            Une approche communautaire, transparente et API-first.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Victims */}
          <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-text/10 bg-card/5 p-6 ring-emerald-500/0 transition hover:ring-2">
            <div
              className="absolute w-1/2 h-1/2 right-0 -inset-6 rounded-[2.5rem] bg-red-400/20 blur-3xl transition-opacity duration-500"
              aria-hidden
            />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 ring-1 ring-red-400/30">
              <MessageSquareWarning className="h-5 w-5 text-red-300" />
            </div>
            <h3 className="text-xl font-semibold">Pour les victimes</h3>
            <p className="mt-2 text-sm text-text/80">
              Un parcours simple et sécurisé pour{" "}
              <span className="font-medium">signaler une arnaque</span>, joindre
              des preuves, et suivre l’état du dossier.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text/80">
              <li className="flex items-start gap-2">
                <FileWarning className="mt-0.5 h-4 w-4 text-red-300" />
                <span>
                  Formulaire de signalement en 30 s (téléphone, email, URL)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>
                  Suivi par identifiant de dossier (sans exposer vos données
                  personnelles)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LifeBuoy className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>
                  Conseils concrets : banque, police, plateformes concernées
                </span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/report"
                className="inline-flex items-center justify-center rounded-full bg-red-400 px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                Signaler une arnaque
              </Link>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto hidden h-24 w-11/12 rounded-3xl bg-red-500/5 blur-3xl group-hover:block" />
          </article>

          {/* Simple users */}
          <article className="group overflow-hidden relative flex flex-col rounded-2xl border border-text/10 bg-card/5 p-6 ring-emerald-500/0 transition hover:ring-2">
            <div
              className="absolute w-1/2 h-1/2 right-0 -inset-6 rounded-[2.5rem] bg-green-400/20 blur-3xl transition-opacity duration-500"
              aria-hidden
            />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/30">
              <Search className="h-5 w-5 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold">Pour les citoyens</h3>
            <p className="mt-2 text-sm text-text/80">
              <span className="font-medium">Vérification instantanée</span> de
              numéros, emails et liens avec score de confiance, étiquettes et
              sources.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>
                  Résultats transparents : provenance, premières/dernières
                  détections
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Bell className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>Conseils pratiques : quoi faire / ne pas faire</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 text-yellow-300" />
                <span>
                  Extension navigateur (optionnelle) pour alertes en temps réel
                </span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-full bg-green-400 px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                Vérifier un numéro / lien
              </Link>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto hidden h-24 w-11/12 rounded-3xl bg-emerald-400/5 blur-3xl group-hover:block" />
          </article>

          {/* Developers */}
          <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-text/10 bg-card/5 p-6 ring-emerald-500/0 transition hover:ring-2">
            <div
              className="absolute w-1/2 h-1/2 right-0 -inset-6 rounded-[2.5rem] bg-primary/30 blur-3xl transition-opacity duration-500"
              aria-hidden
            />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl  ring-1 ring-blue-400/30">
              <Image src="/images/code.png" alt="" width={200} height={200} />
            </div>
            <h3 className="text-xl font-semibold">Pour les développeurs</h3>
            <p className="mt-2 text-sm text-text/80">
              Une <span className="font-medium">API simple et rapide</span> pour
              intégrer la vérification dans vos produits (web, mobile,
              marketplace, fintech, messagerie).
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text/80">
              <li className="flex items-start gap-2">
                <PlugZap className="mt-0.5 h-4 w-4 text-blue-300" />
                <span>
                  Endpoints REST:{" "}
                  <code className="rounded bg-card/30 px-1">/v1/lookup</code>,{" "}
                  <code className="rounded bg-card/30 px-1">/v1/report</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 text-blue-300" />
                <span>Docs Swagger, Postman collection, SDKs (à venir)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>Clés API, quotas, webhooks d’événements</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                API & Docs
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-full bg-card/30 px-4 py-2 text-sm ring-1 ring-white/15 transition hover:bg-card/30"
              >
                Essayer l’API (demo)
              </Link>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto hidden h-24 w-11/12 rounded-3xl bg-blue-400/5 blur-3xl group-hover:block" />
          </article>
        </div>

        {/* Bottom CTA */}
        {/* <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-sm text-text/70">
            Données transparentes, respect de la vie privée et procédures de
            vérification. Ensemble, prévenons la fraude.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
            >
              Vérifier maintenant
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center rounded-full bg-card/30 px-5 py-2 text-sm ring-1 ring-white/15 transition hover:bg-card/30"
            >
              Signaler une arnaque
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full bg-card/30 px-5 py-2 text-sm ring-1 ring-white/15 transition hover:bg-card/30"
            >
              Explorer l’API
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
}
