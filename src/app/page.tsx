import { Poll } from "@/components/poll";
import { db } from "@/lib/db";

export default async function Home() {
  const data = await db.poll.findMany({
    include: {
      Option: true,
      Vote: true,
    },
  });
  return (
    <main className="flex flex-col gap-y-5">
      {data?.map((poll, index) => (
        <Poll key={index} {...poll} />
      ))}
    </main>
  );
}
