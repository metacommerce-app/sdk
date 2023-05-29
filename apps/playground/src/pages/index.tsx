import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111111] py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          <span className="from-brandred to-brandblue block bg-gradient-to-r bg-clip-text px-2 text-transparent">Metacommerce</span>
          SDK Playground
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <button
              onClick={() => router.push("/minting")}
              className="bg-brandred hover:bg-brandred-light flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white md:px-10 md:py-4 md:text-lg"
            >
              Minting
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
