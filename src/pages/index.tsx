import Link from "next/link"
import { GetStaticProps } from "next/types"
import { prisma } from "../lib/prisma"
import PageWrapper from "@/components/PageWrapper"

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <div className="">
          <div className="flex justify-center items-center pt-16">
            <h1 className="text-slate-700 text-2xl">Sejam muito bem vindos!</h1>
          </div>

          <div className="flex justify-center mt-8">
            <p className="text-slate-600 text-center">
              Ao 8º encontro anual da família Barbosa da Silveira
            </p>
          </div>
        </div>

        <div className="flex flex-row mt-32 justify-center">
          <Link href="/checkIn">Check In</Link>
          <div className="mx-3">|</div>
          <Link href="/persons">Persons</Link>
          <div className="mx-3">|</div>
          <Link href="/credit">Meu Crédito</Link>
        </div>
      </div>
    </PageWrapper>
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
