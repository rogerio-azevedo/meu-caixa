import BottomAdmin from '@/components/BottomAdmin'
import PageWrapper from '@/components/PageWrapper'
import { useEffect, useState } from 'react'

interface ConsumedProduct {
  amount: number | null
  id: string
  description: string
}

const Admin = () => {
  const [consumedProducts, setConsumedProducts] = useState<any>()
  const [consumed, setConsumed] = useState<any>()

  useEffect(() => {
    fetch('/api/consumedProducts').then(async res => {
      const data = await res?.json()
      setConsumedProducts(data?.balance)
      setConsumed(data?.consumed)
    })
  }, [])

  return (
    <PageWrapper>
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-col flex-1 px-4 mt-6 gap-4">
          <h1 className="text-2xl font-bold text-center">
            Painel Administrativo
          </h1>
          <div className="text-center">
            {consumedProducts &&
              consumedProducts.map((product: any) => (
                <div key={product.id}>
                  <p>
                    {product.description} : {product.amount ?? 0}
                  </p>
                </div>
              ))}
          </div>

          <div className="flex h-full pt-2 justify-center items-center">
            <table className="table-fixed border border-slate-500">
              <thead className="">
                <tr>
                  <th className="border-collapse border border-slate-500 px-4">
                    Nome
                  </th>
                  <th className="border-collapse border border-slate-500 px-4">
                    Consumo
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {consumed?.map((data: any, index: any) => (
                  <tr key={index} className="text-sm text">
                    <td className="border-collapse border border-slate-500 px-2">
                      {data.person}
                    </td>
                    <td className="border-collapse border border-slate-500 px-2">
                      {data.consumo.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <BottomAdmin className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Admin
