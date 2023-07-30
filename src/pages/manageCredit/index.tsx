import PageWrapper from '@/components/PageWrapper'
import BottomAdmin from '@/components/BottomAdmin'
import { useEffect, useState } from 'react'
import { SelectPerson } from '@/components/SelectPerson'

type Person = {
  id: string
  name: string
}

interface Product {
  id: string
  description: string
  price: number
}

type OptionType = { label: string; value: string }

export default function ManageCredit() {
  const [data, setData] = useState<{
    negativeBalance: {
        [productId: string]: number;
    }
  }>()
  const [products, setProducts] = useState<Product[]>();
  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })

    fetch('/api/products').then(async res => {
      setProducts(await res.json())
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
              <h1 className="text-xl font-bold text-center">Saldo negativo</h1>
              <table className="table-fixed border border-slate-500">
                <thead className="">
                  <tr>
                    <th className="border-collapse border border-slate-500 px-4">
                      Produto
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Saldo
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Preço unitário
                    </th>
                    <th className="border-collapse border border-slate-500 px-4">
                      Preço total
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                {Object.entries(data?.negativeBalance ?? {}).map(([productName, amount])=>(
                    <tr key={productName} className="text-sm text">
                      <td className="border-collapse border border-slate-500 px-2">
                        {productName}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {amount}
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {
                          ((products?.find((p)=>p.description==productName)?.price ?? 0)).toLocaleString("pt-br", {
                            style: 'currency',
                            currency: 'BRL',
                          })
                        }
                      </td>
                      <td className="border-collapse border border-slate-500 px-2">
                        {
                          ((products?.find((p)=>p.description==productName)?.price ?? 0) * Math.abs(amount)).toLocaleString("pt-br", {
                            style: 'currency',
                            currency: 'BRL',
                          })
                        }
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
