import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";

function formatMoneyCAD(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}

function minutesToText(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-zinc-600">
      {items.map((d) => (
        <li key={d} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const item = services.find((s) => s.id === resolvedParams.id);
  if (!item) return notFound();

  return (
    <section className="mx-auto min-h-screen bg-zinc-950 px-4 py-14 text-zinc-100">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="h-48 bg-zinc-50" />

        <div className="p-6 md:p-8">
          <Link href="/services" className="text-sm font-semibold text-zinc-700 hover:text-zinc-900">
            ← 返回服务列表
          </Link>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-white">{item.title}</h1>
              {item.subtitle ? <p className="mt-2 text-sm text-zinc-600">{item.subtitle}</p> : null}
            </div>

            <div className="rounded-2xl border bg-zinc-900 border-zinc-800 px-5 py-4 text-right">
              <div className="text-xl font-bold">{formatMoneyCAD(item.priceCAD)}</div>
              <div className="text-sm text-zinc-500">{minutesToText(item.durationMin)}</div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-zinc-700">{item.shortDesc}</p>

          {/* 包含内容 */}
          {item.details?.length ? (
            <>
              <div className="mt-7 text-sm font-semibold">包含内容</div>
              <BulletList items={item.details} />
            </>
          ) : null}

          {/* 适合谁 / 不适合谁 / 周期建议 */}
          {(item.recommendedFor?.length ||
            item.notRecommendedFor?.length ||
            item.recommendedFrequency) && (
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {item.recommendedFor?.length ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="text-sm font-semibold">适合谁</div>
                  <BulletList items={item.recommendedFor} />
                </div>
              ) : null}

              {item.notRecommendedFor?.length ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="text-sm font-semibold">不适合谁</div>
                  <BulletList items={item.notRecommendedFor} />
                </div>
              ) : null}

              {item.recommendedFrequency ? (
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="text-sm font-semibold">建议周期</div>
                  <p className="mt-3 text-sm text-zinc-600">{item.recommendedFrequency}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    * 具体以毛量、生活环境与造型需求调整。
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* 注意事项 / 开荒说明 */}
          {item.notes?.length ? (
            <div className="mt-7 rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold">注意事项</div>
              <BulletList items={item.notes} />
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-2 md:flex-row">
            <Link
              href="#"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Book（稍后接）
            </Link>
            <Link
              href="/contact"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-semibold hover:bg-zinc-50"
            >
              发照片咨询
            </Link>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            * 价格/时长为参考，可能因体型、毛量、打结程度与配合度调整。
          </p>
        </div>
      </div>
    </section>
  );
}
