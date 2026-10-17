import { Card } from "@radix-ui/themes";
import { careers } from "@/data/career.json";

interface CareerEntry {
  name: string;
  entry_month: string;
  out_month: string;
  rank: string;
  role: string[];
}

export default function Career() {
  return (
    <div className="section-group">
      <div className="flex flex-row items-center gap-2">
        <h2 className="section-title">Career</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
        {careers.map((career: CareerEntry) => (
          <Card key={career.name}>
            <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div className="flex min-w-0 flex-col">
                <h3 className="section-subtitle mb-2 break-words">{career.name}</h3>
                <p className="section-meta">
                  {career.entry_month} ~ {career.out_month}
                </p>
                <p className="section-meta">{career.rank}</p>
              </div>
              <div className="flex flex-col justify-center pt-1">
                <ul className="list-disc space-y-2 pl-5 break-keep">
                  {career.role.map((role: string, index: number) => (
                    <li key={index} className="section-body">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
