import { Awards, Career } from "@/components/career";

export default function Careers() {
  return (
    <section
      id="careers"
      className="bg-accent snap-section flex w-full flex-col items-start justify-center gap-y-2 p-5 text-start md:p-10 lg:p-10"
    >
      <Career />
      <Awards />
    </section>
  );
}
