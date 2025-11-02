"use client";
import React from "react";
import { Phone, MapPin, Mail, CalendarClock } from "lucide-react";
import ContactForm from "./ContactForm";
type InfoItem = {
  title: string;
  lines: string[];
  icon: React.ReactNode;
};

const INFO: InfoItem[] = [
  {
    title: "Ligne d’assistance",
    lines: [
      "Disponible pour guidance et signalements",
      "📞 *Service en ligne — priorité aux messages*",
    ],
    icon: <Phone className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Localisation",
    lines: [
      "Nous opérons au Québec",
      "Support numérique partout dans la province",
    ],
    icon: <MapPin className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Courriel de Support",
    lines: ["support@securiqc.ca", "signalements@securiqc.ca"],
    icon: <Mail className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Disponibilité",
    lines: ["Lun – Ven : 9h00 – 18h00", "Réponse garantie sous 48h"],
    icon: <CalendarClock className="h-6 w-6" aria-hidden="true" />,
  },
];

export default function ContactSection() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Besoin d’aide ou envie de contribuer ?
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Intro + Cards */}
          <div>
            <p className="text-slate-600  max-w-xl my-8 ">
              Parce que votre temps est précieux, nous vous garantissons une
              réponse rapide et personnalisée.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INFO.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-5 flex flex-col items-center text-center"
                >
                  <div className="inline-flex items-center justify-center rounded-full bg-primary text-black h-12 w-12">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    {item.lines.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* If your ContactForm already has its own card/wrapper, you can remove this parent div */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
