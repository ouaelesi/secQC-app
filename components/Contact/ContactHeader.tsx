import Image from "next/image";
import React from "react";

export default function ContactHeader() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000919] text-white">
      {/* background grid */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* Heading */}
        <div className="text-center md:w-2/3 mx-auto">
          <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl">
            Besoin <span className="text-primary"> d’aide ?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-balance text-white/80">
            Contactez-nous pour poser une question, signaler une activité
            suspecte, proposer une collaboration ou contribuer à notre base de
            données anti-fraude. Ensemble, rendons Internet plus sûr pour tous.
          </p>

          <p className="mx-auto mt-3 text-sm text-white/60">
            Vos informations sont confidentielles et protégées.
          </p>
        </div>
      </div>
    </section>
  );
}
