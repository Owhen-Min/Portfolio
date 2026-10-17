import { Awards, Career } from "@/components/career";

export default function Careers() {
  return (
    <section id="careers" className="surface-muted snap-section section-layout">
      <div className="portfolio-container section-stack">
        <Career />
        <Awards />
      </div>
    </section>
  );
}
