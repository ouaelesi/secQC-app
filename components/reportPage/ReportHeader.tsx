import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import QuebecFlag from "../common/QuebecFlag";

/**
 * RightPlaceSection — matches the provided mock
 * - Large heading + subtitle
 * - Media card with rounded corners
 * - Floating left badge (15 ans d'expertise)
 * - Floating glass card top-right (Solutions Fiables)
 * - Bottom centered green CTA pill (Inside our process)
 * - 3 stats below
 */
export default function ReportHeader() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-text">
      <QuebecFlag />
      {/* background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "-1px -1px",
        }}
      />

      <div className="text-center pt-20 mt-5 mx-auto relative ">
        <h2 className="text-balance text-4xl z-50 font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl md:max-w-8/10 mx-auto px-4">
          Signalez une arnaque.
          <br />
          <span className="text-primary">Protégez votre communauté.</span>
        </h2>

        <p className="mx-auto text-md font-medium mt-4 max-w-3xl text-balance text-white/80">
          Chaque signalement compte. En partageant une tentative de fraude ou
          une activité suspecte, vous aidez à identifier des escrocs, prévenir
          de nouvelles victimes, et rendre Internet plus sûr pour les citoyens
          du Québec.
          <br />
          <br />
          Votre information enrichit notre base publique et soutient la sécurité
          de tous —
          <span className="text-primary font-bold">
            {" "}
            votre anonymat est protégé.
          </span>
        </p>
      </div>
    </section>
  );
}
