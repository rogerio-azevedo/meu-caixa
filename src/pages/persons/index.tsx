import { FaLock, FaLockOpen } from 'react-icons/fa'

import PageWrapper from '@/components/PageWrapper'
import BottomAdmin from '@/components/BottomAdmin'
import { useEffect, useState } from 'react'

type Person = {
  id: string
  name: string
  isAdmin: boolean
}

export default function Persons() {
  const [persons, setPersons] = useState<Person[]>()
  const [tableKey, setTableKey] = useState(0)

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })
  }, [tableKey])

  const handleToggleAdmin = async (id: string, isAdmin: boolean) => {
    await fetch('/api/toggleAdmin', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        isAdmin: !isAdmin,
      }),
    })
    setTableKey(tableKey + 1)
  }

  return (
    <PageWrapper>
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 flex-col px-4 mt-6">
          <h1 className="text-2xl font-bold text-center">
            Listagem de Usuários
          </h1>

          <div
            key={tableKey}
            className="flex max-h-[600px] px-4 mb-20 mt-6 pt-4"
          >
            <div className="h-full pt-2 overflow-y-auto">
              <table className="table-fixed border border-slate-500">
                <thead className="">
                  <tr>
                    <th className="border-collapse border border-slate-500 px-4">
                      Nome
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Admin
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {persons?.map((person: any) => (
                    <tr key={person.id} className="text-sm text">
                      <td className="border-collapse border border-slate-500 px-2">
                        {person.name}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2 text-center">
                        {person.isAdmin ? 'Sim' : 'Não'}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2 py-2 text-center">
                        <button
                          onClick={() => {
                            handleToggleAdmin(person.id, person.isAdmin)
                          }}
                          className="justify-center items-center text-center h-8 inline align-baseline bg-teal-200 px-2 rounded-full"
                        >
                          {person.isAdmin ? (
                            <FaLock size={18} color="#0007d6" />
                          ) : (
                            <FaLockOpen size={18} color="#d30808" />
                          )}
                        </button>
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

// export const getStaticProps: GetStaticProps = async () => {
//   const persons = await prisma.person.findMany({
//     orderBy: {
//       name: 'asc',
//     },
//   })

//   const serializedPersons = persons.map(person => ({
//     ...person,
//     created_at: person.created_at.toISOString(),
//     updated_at: person.updated_at.toISOString(),
//   }))

//   return {
//     props: { persons: serializedPersons },
//     revalidate: 10,
//   }
// }
