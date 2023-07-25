import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { prisma } from '../lib/prisma'
import PageWrapper from '@/components/PageWrapper'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession()
  console.log(data)
  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <div className="">
          <div className="flex flex-col justify-center items-center pt-16">
            <h1 className="text-slate-700 text-2xl">Sejam muito bem vindo!</h1>
            <h1 className="text-blue-500 font-bold text-xl">
              {data?.user?.name}
            </h1>
          </div>

          <div className="flex justify-center mt-8">
            <p className="text-slate-600 text-center">
              Sejam todos bem-vindos ao 6º encontro anual da família Barbosa da
              Silveira! Três dias de alegria, união e momentos inesquecíveis nos
              esperam. Vamos celebrar juntos nossa história e fortalecer laços
              preciosos.
            </p>
          </div>
        </div>

        <div className="flex flex-row mt-32 justify-center">
          <Link href="/checkIn">Check In</Link>
          <div className="mx-3">|</div>
          <Link href="/persons">Persons</Link>
          <div className="mx-3">|</div>
          <Link href="/credit">Crédito</Link>
          <div className="mx-3">|</div>
          <Link href="/checkOut">Caixa</Link>
        </div>
      </div>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const persons = await prisma.person.findMany()

  // Convert the Date object to a string representation
  const serializedPersons = persons.map(person => ({
    ...person,
    created_at: person.created_at.toISOString(),
    updated_at: person.updated_at.toISOString(),
  }))

  return {
    props: { persons: serializedPersons },
    revalidate: 10,
  }
}
