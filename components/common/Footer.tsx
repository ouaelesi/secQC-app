import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuebecFlag from "./QuebecFlag";

export default function FooterSection() {
  return (
    <footer className="relative isolate bg-foreground text-text overflow-hidden">
      <QuebecFlag />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 md:pb-7">
        {/* top row */}
        <div className="grid justify-content-between grid-cols-1 gap-10 lg:grid-cols-4">
          {/* left: brand + alerts signup */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/images/qc.png"
                width={200}
                height={50}
                alt="Logo SécuriQC"
                className="w-30"
              />
            </div>

            <h3 className="text-lg font-semibold">
              Recevez les alertes d’arnaques au Québec
            </h3>
            <p className="mt-2 max-w-xl text-text/80">
              Abonnez-vous pour être averti des campagnes actives (SMS, emails,
              faux logements, faux services) et des nouvelles entrées dans la
              liste noire.
            </p>

            <form action="#" className="mt-6 flex max-w-xl items-center gap-3">
              <label htmlFor="email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-text placeholder:text-text/60 ring-1 ring-text/15 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="whitespace-nowrap cursor-pointer md:block hidden rounded-xl bg-primary px-5 py-3 font-medium text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                Recevoir les alertes
              </button>
              <button
                type="submit"
                aria-label="Recevoir les alertes"
                className="whitespace-nowrap block md:hidden rounded-xl bg-primary px-3 py-3 font-medium text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>

            <p className="mt-3 text-xs text-text/60">
              Zéro spam. Désinscription en un clic.
            </p>
          </div>

          {/* links */}
          <nav
            aria-label="Navigation du pied de page"
            className="grid grid-cols-2 gap-10 lg:col-span-2"
          >
            <div className="md:justify-self-end">
              <div className="text-sm font-semibold text-text/80">
                Ressources
              </div>
              <ul className="mt-4 space-y-3 text-text/80">
                <li>
                  <Link href="/blacklist" className="hover:text-text">
                    Liste noire (recherche)
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-text">
                    Vérifier une source
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="hover:text-text">
                    Signaler une arnaque
                  </Link>
                </li>
                <li>
                  <Link href="/extension" className="hover:text-text">
                    Extension Chrome
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-text">
                    API publique (docs)
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:justify-self-end">
              <div className="text-sm font-semibold text-text/80">
                Informations
              </div>
              <ul className="mt-4 space-y-3 text-text/80">
                <li>
                  <Link href="/about" className="hover:text-text">
                    À propos & mission
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-text">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-text">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-text">
                    Conditions d’utilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/responsible-reporting"
                    className="hover:text-text"
                  >
                    Signalement responsable
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* divider */}
        <hr className="mt-10 border-white/10" />

        {/* bottom row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-text/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} SécuriQC — Fabriqué au Québec. Tous
            droits réservés.
          </p>
          <p className="text-xs text-text/60">
            Avertissement : les informations fournies sont à titre informatif et
            ne constituent pas un avis légal. En cas d’urgence ou de fraude en
            cours, contactez le 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
