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
    <>
      <div className="mb-2 flex flex-row items-center gap-2">
        <h3 className="text-xl sm:text-3xl">Career</h3>
      </div>
      <div className="mb-8">
        {careers.map((career: CareerEntry) => (
          <Card>
            <div className="grid grid-cols-2 gap-10 p-3 sm:grid-cols-[1fr_2fr]">
              <div className="flex flex-col">
                <h4 className="mb-2 text-lg font-semibold sm:text-xl">{career.name}</h4>
                <p className="text-gray-600">
                  {career.entry_month} ~ {career.out_month}
                </p>
                <p className="text-gray-600">{career.rank}</p>
              </div>
              <div className="flex flex-col justify-center pt-1">
                <ul className="list-disc break-keep">
                  {career.role.map((role: string) => (
                    <li className="text-sm leading-7 text-gray-800 sm:text-base">{role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
