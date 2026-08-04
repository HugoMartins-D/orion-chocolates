import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

export default function TrabalheConosco() {
  const scale = useNavScale();
  const scope = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      gsap.set(".fade-in", { opacity: 0, y: 24 });
      gsap.to(".fade-in", { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative min-h-screen bg-white">
      <header
        className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-sm"
        style={{ height: 64 * scale, borderColor: HEADER_BORDER }}
      >
        <div style={{ width: 1440, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <NavigationMenu4 />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-20 pb-32">
        <h1
          className="fade-in text-[42px] leading-[1.1] sm:text-[56px]"
          style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}
        >
          Trabalhe conosco
        </h1>

        <div className="mt-20 grid items-start gap-x-16 gap-y-12 md:grid-cols-2">
          <div className="fade-in h-80 overflow-hidden rounded-xl">
            <img
              alt="Uma das primeiras funcionárias da Orion trabalhando na produção artesanal dos chocolates"
              src={imgPrimeiraFuncionaria}
              className="size-full object-cover"
            />
          </div>

          <div className="fade-in text-right">
            <h2 className="text-2xl" style={{ fontFamily: PLAYFAIR, color: TITLE_COLOR }}>
              Faça parte da nossa história.
            </h2>
            <p className="mt-6 leading-relaxed" style={{ fontFamily: DM_SANS, color: LEAD_COLOR }}>
              Se você acredita na dedicação, no compromisso com a qualidade e na busca pela
              excelência, venha construir sua trajetória conosco. Faça parte da equipe Orion e
              cresça em uma empresa que há mais de seis décadas transforma chocolates finos em
              momentos especiais.
            </p>
            <a
              href="mailto:contato@orionchocolates.com.br?subject=Currículo"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-[14px] bg-[#251116] px-8 font-bold text-[#e29647] transition-opacity hover:opacity-90"
              style={{ fontFamily: DM_SANS }}
            >
              Envie seu currículo
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
