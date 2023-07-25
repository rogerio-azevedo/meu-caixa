import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main
      className={`flex flex-1 items-center justify-center bg-white ${inter.className}`}
    >
      <div className="flex max-w-3xl items-center justify-center">
        <div className="flex w-[800px] h-96 bg-slate-300">
          <h1></h1>Familia Barbosa
        </div>

        <Link href="/checkIn">CheckIn</Link>
      </div>
    </main>
  )
}
