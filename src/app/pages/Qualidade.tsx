import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavigationMenu4 from "@/app/components/ui/navigation-menu-4";
import Footer from "@/app/components/Footer";
import { useNavScale } from "@/app/hooks/useNavScale";
import { useLanguage } from "@/i18n/LanguageContext";
import imgEmbalagemPresente from "@/assets/images/qualidade-embalagem-presente.png";
import imgLataDecorada from "@/assets/images/qualidade-lata-decorada.png";

const PLAYFAIR = "'Vesper Nocturne', serif";
const DM_SANS = "'Creato Display', 'DM Sans', sans-serif";

const BG = "#ffffff";
const HEADER_BG = "#fffffff2";
const HEADER_BORDER = "#e8d9c8";
const BODY_TEXT = "#532118";

export default function Qualidade() {
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
    <div ref={scope} className="relative min-h-screen" style={{ background: BG }}>
      <header
        className="sticky top-0 z-30 w-full border-b backdrop-blur-sm"
        style={{ height: 64 * scale, borderColor: HEADER_BORDER, background: HEADER_BG }}
      >
        <div style={{ width: 1440, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <NavigationMenu4 />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-20 pb-32">
        <h1
          className="fade-in text-[42px] leading-[1.1] text-[#e29647] sm:text-[56px]"
          style={{ fontFamily: PLAYFAIR }}
        >
          {t.qualidade.titleLine1}
          <br />
          {t.qualidade.titleLine2}
        </h1>

        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
          <div className="flex flex-col gap-14">
            <div className="fade-in">
              <h2 className="text-2xl text-[#e29647]" style={{ fontFamily: PLAYFAIR }}>
                {t.qualidade.section1Title}
              </h2>
              <p className="mt-6 leading-relaxed" style={{ fontFamily: DM_SANS, color: BODY_TEXT }}>
                {t.qualidade.section1Text}
              </p>
            </div>
            <div className="fade-in h-72 overflow-hidden rounded-2xl">
              <img
                alt="Caixa de chocolates finos Orion embalada para presente, com laço de cetim"
                src={imgEmbalagemPresente}
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-14 md:mt-16">
            <div className="fade-in h-72 overflow-hidden rounded-2xl">
              <img
                alt="Lata decorativa de chocolates Orion com estampa floral"
                src={imgLataDecorada}
                className="size-full object-cover"
              />
            </div>
            <div className="fade-in text-right">
              <h2 className="text-2xl text-[#e29647]" style={{ fontFamily: PLAYFAIR }}>
                {t.qualidade.section2Title}
              </h2>
              <p className="mt-6 leading-relaxed" style={{ fontFamily: DM_SANS, color: BODY_TEXT }}>
                {t.qualidade.section2Text}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
