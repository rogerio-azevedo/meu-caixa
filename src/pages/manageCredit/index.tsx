import PageWrapper from '@/components/PageWrapper'
import BottomAdmin from '@/components/BottomAdmin'
import { useEffect, useState } from 'react'
import { SelectPerson } from '@/components/SelectPerson'

type Person = {
  id: string
  name: string
}

type Product = {
  id: string
  description: string
}

type Credit = {
  id: string
  amount: number
  productId: string
  personId: string
  paid: boolean

  product: Product
  person: Person
}

type OptionType = { label: string; value: string }

export default function ManageCredit() {
  const [data, setData] = useState<{
    balance: {
        [productId: string]: number;
    }
    credits: Credit[]
  }>()
  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })
  }, [])

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })

    fetch(`/api/credits?personId=${selectedPersonId}`).then(async res => {
      setData(await res.json())
    })
  }, [selectedPersonId])

  console.log(data)

  return (
    <PageWrapper>
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 flex-col px-4 mt-6">
          <h1 className="text-2xl font-bold text-center">
            Listagem de Usuários
          </h1>

          <div className="flex w-full px-4">
            <SelectPerson
              options={persons.map(person => ({
                label: person.name,
                value: person.id,
              }))}
              onChange={(option: any) =>
                setSelectedPersonId(option && (option as OptionType).value)
              }
            />
          </div>

          <div className="flex max-h-[600px] px-4 mb-20 mt-6 pt-4">
            <div className="h-full pt-2 overflow-y-auto">
              <table className="table-fixed border border-slate-500">
                <thead className="">
                  <tr>
                    <th className="border-collapse border border-slate-500 px-4">
                      Produto
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Pessoa
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Qtde
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Pago
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.credits?.map((item: Credit) => (
                    <tr key={item.id} className="text-sm text">
                      <td className="border-collapse border border-slate-500 px-2">
                        {item.product.description}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {item.person.name}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {item.amount}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2 text-center">
                        {item.paid ? 'Sim' : 'Não'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="table-fixed border border-slate-500  mt-4">
                <thead className="">
                  <tr>
                    <th className="border-collapse border border-slate-500 px-4">
                      Produto
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Quantidade
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                {Object.entries(data?.balance ?? {}).map(([productId, amount])=>(
                    <tr key={productId} className="text-sm text">
                      <td className="border-collapse border border-slate-500 px-2">
                        {productId}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {amount}
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
