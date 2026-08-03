import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const DM_SANS = "'Creato Display', 'DM Sans', sans-serif";
const PLAYFAIR = "'Vesper Nocturne', serif";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.to(el, { height: el.scrollHeight, opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(iconRef.current, { rotate: 45, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.to(iconRef.current, { rotate: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="faq-fade border-b border-[#e8d9c8]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-bold text-[#532118]" style={{ fontFamily: DM_SANS }}>
          {question}
        </span>
        <div
          ref={iconRef}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary"
        >
          <Plus className="h-4 w-4 text-secondary" strokeWidth={2.5} />
        </div>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p
          className="pb-6 leading-relaxed text-[#6a6a6a]"
          style={{ fontFamily: DM_SANS }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const scope = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  useGSAP(
    () => {
      gsap.set(".faq-fade", { opacity: 0, y: 24 });
      gsap.to(".faq-fade", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="w-full bg-muted">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="faq-fade text-center">
          <p
            className="text-sm font-bold tracking-[0.2em] text-primary uppercase"
            style={{ fontFamily: DM_SANS }}
          >
            {t.faq.eyebrow}
          </p>
          <h2
            className="mt-4 text-[36px] leading-[1.1] text-[#532118] sm:text-[48px]"
            style={{ fontFamily: PLAYFAIR }}
          >
            {t.faq.title}
          </h2>
        </div>

        <div className="mt-14">
          {t.faq.items.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
