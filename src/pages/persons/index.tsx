import { GetStaticProps } from 'next/types'
import { prisma } from '../../lib/prisma'
import PageWrapper from '@/components/PageWrapper'
import BottomAdmin from '@/components/BottomAdmin'

export default function Persons({ persons }: any) {
  return (
    <PageWrapper>
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 flex-col px-4 mt-6">
          <h1 className="text-2xl font-bold text-center">
            Listagem de Usuários
          </h1>

          <div className="flex max-h-[600px] px-4 mb-20 mt-6 pt-4">
            <div className="h-full pt-2 overflow-y-auto">
              <table className="table-fixed border border-slate-500">
                <thead className="">
                  <tr>
                    <th className="border-collapse border border-slate-500 px-4">
                      Nome
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Documento
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {persons?.map((person: any) => (
                    <tr key={'person.id'} className="text-sm">
                      <td className="border-collapse border border-slate-500 px-2">
                        {person.name}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {person.document}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <BottomAdmin className="flex" />
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
