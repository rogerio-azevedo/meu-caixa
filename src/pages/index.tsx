import { Inter } from "next/font/google"
import Link from "next/link"
import { GetStaticProps } from "next/types"
import { prisma } from "../lib/prisma"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ persons }: any) {
  console.log(persons)

  return (
    <main
      className={`flex flex-1 items-center justify-center bg-white ${inter.className}`}
    >
      <div className="flex max-w-3xl items-center justify-center">
        <div className="flex flex-col w-[800px] h-96 bg-slate-300">
          <h1>Familia Barbosa</h1>

          <Link href="/checkIn">Check In</Link>

          <div>
            {persons?.map((person: any) => (
              <div key={person.id}>
                <h4>{person.name}</h4>
                <h4>{person.document}</h4>
              </div>
            ))}
          </div>
        </div>

        <Link href="/checkIn">CheckIn</Link>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const persons = await prisma.person.findMany()

  // Convert the Date object to a string representation
  const serializedPersons = persons.map((person) => ({
    ...person,
    created_at: person.created_at.toISOString(),
    updated_at: person.updated_at.toISOString(),
  }))

  return {
    props: { persons: serializedPersons },
    revalidate: 10,
  }
}
