"use client";

import React, { useState } from "react";
import {
  FileWarning,
  Loader2,
  CheckCircle2,
  ShieldAlert,
  Paperclip,
} from "lucide-react";

type ReportType = "phone" | "email" | "url";

export default function ReportSection() {
  const [type, setType] = useState<ReportType>("phone");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState(""); // démo: URL simple
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);
    setTicketId(null);

    // validations simples
    if (!value.trim()) {
      setErrMsg("Veuillez renseigner la valeur (numéro, email ou URL).");
      return;
    }
    if (!consent) {
      setErrMsg(
        "Vous devez accepter la confidentialité et l'usage des données."
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type,
        value: value.trim(),
        description: description.trim() || undefined,
        city: city.trim() || undefined,
        evidence: evidenceUrl ? [evidenceUrl.trim()] : undefined,
        reporter_contact: reporterEmail.trim() || undefined,
      };

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrMsg(data?.error || "Échec de l'envoi du signalement.");
      } else {
        setOkMsg("Merci ! Votre signalement a été reçu.");
        setTicketId(data?.id || null);
        // reset partiel
        setDescription("");
        setEvidenceUrl("");
      }
    } catch (err) {
      setErrMsg("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative isolate bg-foreground py-16 text-text">
      {/* décor discret */}
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
          <span className="inline-flex items-center gap-2 rounded-full bg-card/30 px-3 py-1 text-xs ring-1 ring-text/15">
            <ShieldAlert className="h-4 w-4 text-red-300" />
            Signaler une arnaque
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Aidez la communauté à rester en sécurité
          </h2>
          <p className="mt-3 text-text/80">
            Décrivez brièvement ce qui s’est passé. Votre signalement contribue
            à améliorer la détection et à protéger d’autres personnes. Votre
            email est facultatif.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-card/10 p-5 ring-1 ring-text/10 backdrop-blur">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Type */}
            <div>
              <label className="mb-1 block text-sm text-text/80">Type</label>
              <div className="flex flex-wrap gap-2">
                {(["phone", "email", "url"] as ReportType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      type === t
                        ? "bg-primary text-black font-semibold"
                        : "bg-card/30 text-text/90 hover:bg-card/30"
                    }`}
                  >
                    {t === "phone"
                      ? "Numéro de téléphone"
                      : t === "email"
                      ? "Email"
                      : "URL"}
                  </button>
                ))}
              </div>
            </div>

            {/* Value */}
            <div>
              <label className="mb-1 block text-sm text-text/80">
                {type === "phone"
                  ? "Numéro"
                  : type === "email"
                  ? "Adresse email"
                  : "Lien (URL)"}{" "}
                <span className="text-red-300">*</span>
              </label>
              <input
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  type === "phone"
                    ? "+1 514 555 0000"
                    : type === "email"
                    ? "exemple@domaine.com"
                    : "https://exemple.com"
                }
                className="w-full rounded-xl border border-text/20 bg-card/10 px-4 py-3 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm text-text/80">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expliquez brièvement (plateforme, demande d’argent, menaces, etc.)"
                className="w-full rounded-xl border border-text/20 bg-card/10 px-4 py-3 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
              />
            </div>

            {/* City + Reporter email */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-text/80">
                  Ville (optionnel)
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Montréal, Sherbrooke, Québec…"
                  className="w-full rounded-xl border border-text/20 bg-card/10 px-4 py-3 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text/80">
                  Email de contact (optionnel)
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="exemple@courriel.com"
                  className="w-full rounded-xl border border-text/20 bg-card/10 px-4 py-3 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
                />
              </div>
            </div>

            {/* Evidence URL (demo) */}
            <div>
              <label className="mb-1 block text-sm text-text/80">
                Preuve (lien image / capture — optionnel)
              </label>
              <div className="flex items-center gap-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-card/30 ring-1 ring-text/15">
                  <Paperclip className="h-5 w-5 text-text/80" />
                </div>
                <input
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://lien-vers-votre-capture.png"
                  className="w-full rounded-xl border border-text/20 bg-card/10 px-4 py-3 text-text placeholder-text/50 outline-none focus:border-emerald-400/50"
                />
              </div>
              <p className="mt-1 text-xs text-text/50">
                (Démo) Collez un lien public. Pour un vrai upload sécurisé (S3),
                je peux l’ajouter ensuite.
              </p>
            </div>

            {/* Consent */}
            <label className="mt-1 inline-flex items-start gap-2 text-sm text-text/80">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded-sm border-text/20 bg-transparent"
              />
              <span>
                J’accepte que les informations fournies soient utilisées pour la
                détection et la prévention de la fraude. Mon email (si fourni)
                ne sera pas rendu public.
              </span>
            </label>

            {/* Actions & states */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading || !value.trim() || !consent}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi…
                  </>
                ) : (
                  "Envoyer le signalement"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setType("phone");
                  setValue("");
                  setDescription("");
                  setCity("");
                  setReporterEmail("");
                  setEvidenceUrl("");
                  setConsent(false);
                  setOkMsg(null);
                  setErrMsg(null);
                  setTicketId(null);
                }}
                className="rounded-full bg-card/30 px-5 py-3 text-sm ring-1 ring-text/15 transition hover:bg-card/30"
              >
                Réinitialiser
              </button>
            </div>

            {/* Messages */}
            {okMsg && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-3 text-sm text-emerald-600 ring-1 ring-emerald-400/30">
                <CheckCircle2 className="h-4 w-4" />
                <span>{okMsg}</span>
                {ticketId && (
                  <span className="ml-2 rounded bg-card/30 px-2 py-0.5 text-xs">
                    ID dossier : {ticketId}
                  </span>
                )}
              </div>
            )}
            {errMsg && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-600 ring-1 ring-red-400/30">
                <FileWarning className="h-4 w-4" />
                <span>{errMsg}</span>
              </div>
            )}
          </form>
        </div>

        {/* Info bas de section */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-text/60">
          Nous n’exposons jamais vos informations personnelles. Les identifiants
          (numéro/email/URL) alimentent une base publique avec niveaux de
          confiance et modération.
        </p>
      </div>
    </section>
  );
}
