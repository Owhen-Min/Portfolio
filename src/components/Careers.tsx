import { Awards, Career } from "@/components/career";

export default function Careers() {
  return (
    <section className="bg-accent flex h-full w-full flex-col items-start justify-center gap-y-2 p-5 text-start md:p-10 lg:p-20">
      <Career />
      <Awards />
    </section>
  );
}
