import PageWrapper from '@/components/PageWrapper'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { FaHistory } from 'react-icons/fa'
import { SelectPerson } from '@/components/SelectPerson'

import BottomAdmin from '@/components/BottomAdmin'
import { Toast } from '@/components/Toast'

interface Person {
  id: string
  name: string
}

interface Balance {
  id: string
  amount: number
  product: string
}

interface Log {
  id: string
  date: string
  description: string
}

interface Product {
  id: string
  description: string
  price: number
}

type OptionType = { label: string; value: string }

export default function Credit() {
  const [logs, setLogs] = useState<Log[]>()

  const [products, setProducts] = useState<Product[]>();
  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()

  const [unpaidCreditAmount, setUnpaidCreditAmount] = useState<number>()

  const [selectKey, setSelectKey] = useState(0)

  const [negativeBalance, setNegativeBalance] = useState<{
    [productId: string]: number;
  }>()

  function clearSelect() {
    setSelectKey(selectKey + 1)
  }

  function refresh() {
    if (!selectedPersonId) return

    fetch(`/api/logs?personId=${selectedPersonId}`, {
      method: 'GET',
    }).then(async res => {
      setLogs(await res.json())
    })

    fetch(`/api/unpaidCredits?personId=${selectedPersonId}`, {
      method: 'GET',
    }).then(async res => {
      setUnpaidCreditAmount(await res.json())
    })

    fetch(`/api/credits?personId=${selectedPersonId}`).then(async res => {
      setNegativeBalance((await res.json()))
    })
  }

  // async function payAll() {
  //   if (!selectedPersonId) {
  //     return Toast({
  //       isSuccessToast: false,
  //       message: 'Selecione uma pessoa primeiro',
  //       time: 2000,
  //     })
  //   }

  //   const res = await fetch('/api/payCredits', {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       personId: selectedPersonId,
  //     }),
  //   })

  //   if (res.ok) {
  //     setSelectedPersonId(undefined)
  //     setLogs(undefined)
  //     setUnpaidCreditAmount(undefined)
  //     clearSelect()

  //     return Toast({
  //       isSuccessToast: true,
  //       message: 'Todos os créditos pagos com sucesso',
  //       time: 2000,
  //     })
  //   } else {
  //     return Toast({
  //       isSuccessToast: false,
  //       message: 'Erro',
  //       time: 2000,
  //     })
  //   }
  // }
  
  useEffect(() => {
    fetch('/api/products').then(async res => {
      setProducts(await res.json())
    })

    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })
  }, [])

  useEffect(() => {
    if (!selectedPersonId) return;

    refresh()
  }, [selectedPersonId]) // eslint-disable-line

  const totalToPay =  Object.entries(negativeBalance ?? {}).reduce((acc, [productName, amount])=>{
    const price = (products?.find((p)=>p.description==productName)?.price ?? 0)

    return acc + (price * amount)
  }, 0)

  return (
    <PageWrapper>
      <div className="flex w-full h-full flex-col">
        <div className="flex items-center px-4">
          <div className="flex flex-col w-full justify-center">
            <h1 className="text-2xl font-bold text-center">
              Crédito da Pessoa
            </h1>

            <div className="flex w-full px-4">
              <SelectPerson
                key={selectKey}
                options={persons.map(person => ({
                  label: person.name,
                  value: person.id,
                }))}
                onChange={(option: any) =>
                  setSelectedPersonId(option && (option as OptionType).value)
                }
              />
            </div>

            <div className="flex flex-col w-full justify-between mt-2 items-center">
              <div className="flex flex-col items-center">
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
                {Object.entries(negativeBalance ?? {}).map(([productName, amount])=>(
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
                <p className='py-2'>
                  Total: {" "}
                  <strong>
                  {totalToPay.toLocaleString("pt-br", {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                  </strong>
                </p>
              </div>

              <div className='mb-2'>
                <button
                  onClick={refresh}
                  className="flex justify-center items-center bg-blue-500 p-2 rounded-md"
                >
                  <FaHistory size={25} color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1/3 px-4 mb-8">
          <h2 className="text-xl font-bold text-center">
            Histórico de transações
          </h2>
          <ol className="relative border-l border-gray-200 dark:border-gray-700 overflow-y-scroll h-full pt-2">
            {logs?.map(({ id, date, description }) => (
              <li className="mb-6 ml-6" key={id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 left-[6px] border border-white dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-blue-800">
                  {format(new Date(date), 'dd/MM/yyyy HH:mm:ss')}
                </time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* <div className="px-4"> */}
            {/* <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={payAll}
            >
              Pagar todos (
              {unpaidCreditAmount?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }) ?? 0}
              )
            </button> */}
          {/* </div> */}

          <BottomAdmin className="flex" />
        </div>
      </div>
    </PageWrapper>
  )
}
