import { GetStaticProps } from 'next/types'
import { prisma } from '../../lib/prisma'
import PageWrapper from '@/components/PageWrapper'
import BottomMenu from '@/components/BottomMenu'

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
                  <th className="border-collapse border border-slate-500 px-4">
                    Nome
                  </th>
                  <th className="border-collapse border border-slate-500 px-4">
                    Documento
                  </th>
                </tr>
              </thead>
              <tbody>
                {persons?.map((person: any) => (
                  <tr key={person.id}>
                    <td className="border-collapse border border-slate-500 px-4">
                      {person.name}
                    </td>
                    <td className="border-collapse border border-slate-500  px-4">
                      {person.document}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex w-full">
          <BottomMenu />
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
