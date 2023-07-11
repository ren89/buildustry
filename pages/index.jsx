import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <div className="w-1/2 min-h-full relative">
        <Image src="/images/building.jpg" alt="Building" fill />
      </div>
      <div className="w-1/2 min-h-full flex justify-center items-center">
        <h1 className="uppercase text-emerald-500 font-black tracking-tight text-4xl">
          Buildustry
        </h1>
      </div>
    </main>
  );
}
