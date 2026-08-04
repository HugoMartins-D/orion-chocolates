import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Clock, Award, Heart } from "lucide-react";
import NavigationMenu4 from "@/app/components/ui/navigation-menu-4";
import Footer from "@/app/components/Footer";
import { useNavScale } from "@/app/hooks/useNavScale";
import { useLanguage } from "@/i18n/LanguageContext";
import imgPrimeiraFuncionaria from "@/assets/images/primeira-funcionaria-orion.png";

const PLAYFAIR = "'Vesper Nocturne', serif";
const DM_SANS = "'Creato Display', 'DM Sans', sans-serif";

const HEADER_BORDER = "#e8d9c8";
const TITLE_COLOR = "#532118";
const LEAD_COLOR = "#e29647";
const CARD_BORDER = "#e8d9c8";

const VALUE_ICONS = [Clock, Award, Heart];

export default function TrabalheConosco() {
  const scale = useNavScale();
  const scope = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      gsap.set(".fade-in", { opacity: 0, y: 24 });
      gsap.to(".fade-in", { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" });

      // Slow, continuous drift — not tied to scroll or hover, just a bit of
      // life behind the content so the page doesn't read as a flat, static
      // form. Kept subtle (low opacity, blurred) so it never competes with
      // the actual text/photo for attention.
      gsap.to(".tc-blob-1", { y: -36, x: 24, rotate: 12, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".tc-blob-2", { y: 30, x: -20, rotate: -14, duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6 });
      gsap.to(".tc-blob-3", { y: -22, x: -28, rotate: 18, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative blobs, purely animated background texture — pointer-events
          off and behind everything (z-0), so they never interfere with the
          real content sitting at z-10. */}
      <div className="tc-blob-1 pointer-events-none absolute top-[-120px] right-[-140px] z-0 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-3xl" style={{ background: "#e29647" }} />
      <div className="tc-blob-2 pointer-events-none absolute top-[520px] left-[-160px] z-0 h-[380px] w-[380px] rounded-full opacity-[0.12] blur-3xl" style={{ background: "#532118" }} />
      <div className="tc-blob-3 pointer-events-none absolute top-[900px] right-[8%] z-0 h-[320px] w-[320px] rounded-full opacity-[0.1] blur-3xl" style={{ background: "#e29647" }} />

      <header
        className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-sm"
        style={{ height: 64 * scale, borderColor: HEADER_BORDER }}
      >
        <div style={{ width: 1440, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <NavigationMenu4 />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-32">
        <h1
          className="fade-in text-[42px] leading-[1.1] sm:text-[56px]"
          style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}
        >
          {t.trabalheConosco.title}
        </h1>

        <div className="mt-20 grid items-start gap-x-16 gap-y-12 md:grid-cols-2">
          <div className="fade-in h-80 overflow-hidden rounded-xl">
            <img
              alt={t.trabalheConosco.imgAlt}
              src={imgPrimeiraFuncionaria}
              className="size-full object-cover"
            />
          </div>

          <div className="fade-in text-right">
            <h2 className="text-2xl" style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}>
              {t.trabalheConosco.subtitle}
            </h2>
            <p className="mt-6 leading-relaxed" style={{ fontFamily: DM_SANS, color: LEAD_COLOR }}>
              {t.trabalheConosco.text}
            </p>
            <a
              href="mailto:contato@orionchocolates.com.br?subject=Currículo"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-[14px] bg-[#251116] px-8 font-bold text-[#e29647] transition-opacity hover:opacity-90"
              style={{ fontFamily: DM_SANS }}
            >
              {t.trabalheConosco.cta}
            </a>
          </div>
        </div>

        <section className="mt-24">
          <h2
            className="fade-in text-center text-2xl sm:text-3xl"
            style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}
          >
            {t.trabalheConosco.valuesTitle}
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {t.trabalheConosco.values.map(({ title, text }, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={title}
                  className="fade-in rounded-xl border bg-white p-8 text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                  style={{ borderColor: CARD_BORDER }}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#251116]">
                    <Icon className="h-5 w-5 text-[#e29647]" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-5 text-xl" style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}>
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#6a6a6a]" style={{ fontFamily: DM_SANS }}>
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
