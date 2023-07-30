import PageWrapper from '@/components/PageWrapper'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { FaHistory } from 'react-icons/fa'

import BottomMenu from '@/components/BottomMenu'

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

export default function Credit() {
  const [logs, setLogs] = useState<Log[]>()
  const [products, setProducts] = useState<Product[]>();
  const [negativeBalance, setNegativeBalance] = useState<{
    [productId: string]: number;
  }>()

  const { data } = useSession()

  function refresh() {
    if (!data) return

    fetch(`/api/logs?personId=${data.user.id}`, {
      method: 'GET',
    }).then(async res => {
      setLogs(await res.json())
    })

    fetch(`/api/credits?personId=${data.user.id}`).then(async res => {
      setNegativeBalance((await res.json()))
    })
  }

  useEffect(() => {
    fetch('/api/products').then(async res => {
      setProducts(await res.json())
    })
  }, [])

  useEffect(() => {
    if (!data) return;

    refresh()
  }, [data]) // eslint-disable-line

  const totalToPay =  Object.entries(negativeBalance ?? {}).reduce((acc, [productName, amount])=>{
    const price = (products?.find((p)=>p.description==productName)?.price ?? 0)

    return acc + (price * amount)
  }, 0)

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center px-4">
          <div className="flex flex-col w-full mt-6 justify-center">
            <h1 className="text-2xl font-bold text-center"> Meu Crédito</h1>

            <div className="flex flex-col w-full justify-between items-center mt-6">
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

              <div>
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

        <div className="h-1/3 px-4 mb-24">
          <h2 className="text-xl font-bold text-center mb-6">
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
        <BottomMenu className="flex" />
      </div>
    </PageWrapper>
  )
}
