import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-evenly w-80">
        <Link
          href="/practice-english"
          className="border border-red-500 rounded-lg text-red-500 px-4 py-2 cursor-pointer"
        >
          Practice English
        </Link>
      </div>
    </main>
  );
}
