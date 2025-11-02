"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Filter,
  Download,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Tags,
} from "lucide-react";

import QuickSearchSection from "@/components/homePage/QuickSearchWidget";
import VerifyHeader from "@/components/verifyPage/VerifyHeader";

// Types expected from backend
type IndicatorType = "phone" | "email" | "url" | "domain" | "ip";
type Indicator = {
  id: string;
  type: IndicatorType;
  value: string;
  malicious?: boolean;
  confidence?: number; // 0..1
  status?: string; // "verified" | "unverified" | "whitelisted" | "not_found"
  tags?: string[];
  reportsCount?: number;
  first_seen?: string;
  last_seen?: string;
};

type BlacklistResponse = {
  items: Indicator[];
  total: number;
  page: number;
  limit: number;
};

const TYPES: { label: string; value: "" | IndicatorType }[] = [
  { label: "Tous", value: "" },
  { label: "Téléphone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "URL", value: "url" },
  { label: "Domaine", value: "domain" },
  { label: "IP", value: "ip" },
];

const STATUSES = [
  { label: "Tous", value: "" },
  { label: "Vérifié", value: "verified" },
  { label: "Non vérifié", value: "unverified" },
  { label: "Whitelisté", value: "whitelisted" },
  { label: "Inconnu", value: "not_found" },
];

const SORTS = [
  { label: "Récents d’abord", value: "-last_seen" },
  { label: "Anciens d’abord", value: "last_seen" },
  { label: "Confiance élevée", value: "-confidence" },
  { label: "Confiance faible", value: "confidence" },
  { label: "Plus signalés", value: "-reportsCount" },
];

function fmtDate(s?: string) {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

export default function BlacklistPage() {
  // Filters
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [malicious, setMalicious] = useState<string>(""); // "", "true", "false"
  const [sort, setSort] = useState<string>("-last_seen");
  const [q, setQ] = useState<string>("");

  // Date range
  const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
  const [to, setTo] = useState<string>("");

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  // Data
  const [data, setData] = useState<BlacklistResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  // Debounce search input
  const [qDraft, setQDraft] = useState<string>("");
  useEffect(() => {
    const t = setTimeout(() => setQ(qDraft.trim()), 400);
    return () => clearTimeout(t);
  }, [qDraft]);

  async function fetchData(params?: URLSearchParams) {
    setLoading(true);
    setErr(null);
    try {
      const sp = params ?? new URLSearchParams();
      const resp = await fetch("/api/blacklist?" + sp.toString(), {
        cache: "no-store",
      });
      const json = await resp.json();
      if (!resp.ok) setErr(json?.error || "Erreur de chargement");
      else setData(json);
    } catch {
      setErr("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  // Build query params each time filters/pagination change
  useEffect(() => {
    const sp = new URLSearchParams();
    if (type) sp.set("type", type);
    if (status) sp.set("status", status);
    if (malicious) sp.set("malicious", malicious);
    if (q) sp.set("q", q);
    if (from) sp.set("from", from);
    if (to) sp.set("to", to);
    if (sort) sp.set("sort", sort);
    sp.set("page", String(page));
    sp.set("limit", String(limit));
    fetchData(sp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, status, malicious, q, from, to, sort, page, limit]);

  function resetFilters() {
    setType("");
    setStatus("");
    setMalicious("");
    setQDraft("");
    setQ("");
    setFrom("");
    setTo("");
    setSort("-last_seen");
    setPage(1);
  }

  async function exportCSV() {
    const sp = new URLSearchParams();
    if (type) sp.set("type", type);
    if (status) sp.set("status", status);
    if (malicious) sp.set("malicious", malicious);
    if (q) sp.set("q", q);
    if (from) sp.set("from", from);
    if (to) sp.set("to", to);
    if (sort) sp.set("sort", sort);
    sp.set("format", "csv");
    const url = "/api/blacklist?" + sp.toString();
    window.open(url, "_blank");
  }

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="relative isolate bg-foreground text-text ">
      <VerifyHeader />
      <QuickSearchSection></QuickSearchSection>
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
        {/* Hero */}
        <header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-text/20 px-3 py-1 text-xs text-text shadow-sm  bg-card/30">
              <Shield className="h-4 w-4 text-emerald-600 " />
              Liste noire — Indicateurs signalés
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-text tracking-tight md:text-4xl">
              Blacklist & Filtres avancés
            </h1>
            <p className="mt-2 text-sm text-text">
              Recherchez, filtrez et exportez les indicateurs (téléphone, email,
              URL, domaine, IP).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-full border border-text/20 bg-green-400 px-4 py-2 text-sm text-black shadow-sm hover:bg-slate-50 "
              title="Exporter en CSV"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black ring-1 ring-emerald-500/40"
            >
              API Docs
            </Link>
          </div>
        </header>

        {/* Filters */}
        <section className="mt-6 rounded-2xl border border-black/10  p-4 shadow-sm  bg-card/10 ">
          <div className="mb-3 flex items-center gap-2 text-sm text-text ">
            <Filter className="h-4 w-4 text-emerald-600 " />
            Filtres
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {/* Type */}
            <label className="text-xs text-slate-600 dark:text-text/60">
              Type
              <select
                className="mt-1 w-full rounded-xl border border-text/20 px-3 py-2 text-text outline-none  dark:border-text/20 bg-card/10 dark:text-text"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
              >
                {TYPES.map((t) => (
                  <option key={t.value || "all"} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Status */}
            <label className="text-xs text-slate-600 dark:text-text/60">
              Statut
              <select
                className="mt-1 w-full rounded-xl border border-text/20 px-3 py-2 text-text outline-none  dark:border-text/20 bg-card/10 dark:text-text"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
              >
                {STATUSES.map((s) => (
                  <option key={s.value || "all"} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Malicious */}
            <label className="text-xs text-slate-600 dark:text-text/60">
              Malveillant
              <select
                className="mt-1 w-full rounded-xl border border-text/20  bg-card/10 px-3 py-2 text-text outline-none  dark:border-text/20 dark:bg_white/5 dark:text-text"
                value={malicious}
                onChange={(e) => {
                  setMalicious(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>

            {/* Sort */}
            <label className="text-xs text-slate-600 dark:text-text/60">
              Tri
              <select
                className="mt-1 w-full rounded-xl border border-text/20 bg-card/10 px-3 py-2 text-text outline-none  "
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Search */}
            <label className="text-xs text-slate-600 dark:text-text/60 md:col-span-2">
              Rechercher (valeur, tag…)
              <div className="mt-1 flex items-center gap-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-text/20 text-slate-600 dark:border-text/15 bg-card/30 dark:text-text/70">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  value={qDraft}
                  onChange={(e) => {
                    setQDraft(e.target.value);
                    setPage(1);
                  }}
                  placeholder="ex: +15145550000, kijiji, logement, mtl…"
                  className="w-full rounded-xl border border-text/20 px-3 py-2 text-text outline-none  dark:border-text/20 bg-card/10 dark:text-text"
                />
              </div>
            </label>

            {/* Dates */}
            <label className="text-xs text-slate-600 dark:text-text/60">
              Du (YYYY-MM-DD)
              <input
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                placeholder="2025-10-01"
                className="mt-1 w-full rounded-xl border border-text/20 px-3 py-2 text-text outline-none  dark:border-text/20 bg-card/10 dark:text-text"
              />
            </label>
            <label className="text-xs text-slate-600 dark:text-text/60">
              Au (YYYY-MM-DD)
              <input
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                placeholder="2025-10-31"
                className="mt-1 w-full rounded-xl border border-text/20 px-3 py-2 text-text outline-none  dark:border-text/20 bg-card/10 dark:text-text"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => fetchData()}
              className="inline-flex items-center gap-2 rounded-full border border-text/20  px-4 py-2 text-sm text-text shadow-sm hover:bg-slate-50 dark:border-text/15 bg-card/30 dark:text-text dark:hover:bg-card/30"
            >
              <RefreshCcw className="h-4 w-4" /> Actualiser
            </button>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-text/20 px-4 py-2 text-sm text-text shadow-sm hover:bg-slate-50 dark:border-text/15 bg-card/30 dark:text-text dark:hover:bg-card/30"
            >
              Réinitialiser
            </button>
            <div className="ml-auto text-xs text-slate-600 dark:text-text/60">
              {loading ? "Chargement…" : `${total.toLocaleString()} éléments`}
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="mt-6 rounded-2xl border border-text/20 p-4 shadow-sm dark:border-text/20 bg-card/10 dark:ring-1 dark:ring-white/10 dark:backdrop-blur">
          {err && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-500/15 dark:text-red-600 dark:ring-red-400/30">
              <AlertTriangle className="h-4 w-4" /> {err}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-10 text-slate-600 dark:text-text/70">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement…
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase text-slate-600 dark:text-text/60">
                  <tr>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Valeur</th>
                    <th className="px-3 py-2">Confiance</th>
                    <th className="px-3 py-2">Risque</th>
                    <th className="px-3 py-2">Statut</th>
                    <th className="px-3 py-2">
                      <Tags className="inline h-3 w-3" /> Tags
                    </th>
                    <th className="px-3 py-2">Signalements</th>
                    <th className="px-3 py-2">1ère détection</th>
                    <th className="px-3 py-2">Dernière activité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-text dark:divide-text/20">
                  {(data?.items ?? []).map((it) => {
                    const conf = Math.round((it.confidence ?? 0) * 100);
                    return (
                      <tr
                        key={it.id}
                        className="hover:bg-slate-50 dark:hover:bg-card/10"
                      >
                        <td className="px-3 py-2">{it.type}</td>
                        <td className="px-3 py-2 font-mono text-slate-800 dark:text-text">
                          {it.value}
                        </td>
                        <td className="px-3 py-2">{conf}%</td>
                        <td className="px-3 py-2">
                          {it.confidence && it.confidence > 0.5 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 ring-1 ring-red-200 dark:bg-red-500/20 dark:text-red-600 dark:ring-red-400/30">
                              <ShieldAlert className="h-3 w-3" /> Élevé
                            </span>
                          ) : it.confidence && it.confidence == 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 ring-1 ring-red-200 dark:bg-red-500/20 dark:text-red-600 dark:ring-red-400/30">
                              <ShieldAlert className="h-3 w-3" /> Faible
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-600/20 px-2 py-0.5 text-xs text-orange-500 ring-1 ring-orange-200/20  ">
                              <CheckCircle2 className="h-3 w-3" /> Moyenne
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2">{it.status ?? "—"}</td>
                        <td className="px-3 py-2">
                          {(it.tags ?? []).slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="mr-1 rounded  px-2 py-0.5 text-xs text-text bg-card/30 dark:text-text/80"
                            >
                              #{t}
                            </span>
                          ))}
                          {(it.tags?.length ?? 0) > 3 && (
                            <span className="text-xs text-text ">
                              +{it.tags!.length - 3}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2">{it.reportsCount ?? 0}</td>
                        <td className="px-3 py-2">{fmtDate(it.first_seen)}</td>
                        <td className="px-3 py-2">{fmtDate(it.last_seen)}</td>
                      </tr>
                    );
                  })}
                  {(!data || (data.items?.length ?? 0) === 0) &&
                    !loading &&
                    !err && (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-3 py-8 text-center text-text"
                        >
                          Aucun résultat.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600 dark:text-text/60">
              Page {page} / {totalPages} • {total.toLocaleString()} éléments •
              Afficher
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value, 10));
                  setPage(1);
                }}
                className="ml-2 rounded  px-2 py-1 text-text "
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              /page
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-full border border-text/20 bg-card/30 px-3 py-1 text-sm text-text shadow-sm disabled:opacity-50 hover:bg-slate-50 "
              >
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-full border border-text/20 bg-card/30 px-3 py-1 text-sm text-text shadow-sm disabled:opacity-50 hover:bg-slate-50 "
              >
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-text ">
          Les identifiants (numéros, emails, URLs, domaines, IPs) sont
          normalisés et agrégés. Les informations personnelles ne sont jamais
          exposées.
        </div>
      </div>
    </main>
  );
}
