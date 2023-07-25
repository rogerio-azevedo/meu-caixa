import Link from "next/link"
import { GetStaticProps } from "next/types"
import { prisma } from "../../lib/prisma"
import PageWrapper from "@/components/PageWrapper"

export default function Persons({ persons }: any) {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between items-center py-8">
        <div>
          <h1 className="text-center mb-8">Listagem de Usuários</h1>

          <div className="flex w-full text-sm">
            <table className="table-fixed border border-slate-500">
              <thead>
                <tr>
                  <th className="border-collapse border border-slate-500 px-2">
                    Nome
                  </th>
                  <th className="border-collapse border border-slate-500 px-2">
                    Documento
                  </th>
                  <th className="border-collapse border border-slate-500 px-2">
                    Telefone
                  </th>
                </tr>
              </thead>
              <tbody>
                {persons?.map((person: any) => (
                  <tr key={person.id}>
                    <td className="border-collapse border border-slate-500 px-2">
                      {person.name}
                    </td>
                    <td className="border-collapse border border-slate-500  px-2">
                      {person.document}
                    </td>
                    <td className="border-collapse border border-slate-500  px-2">
                      {person.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex w-full">
          <Link
            href="/"
            className="w-full mt-2 bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Voltar
          </Link>
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
