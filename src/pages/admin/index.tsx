import BottomAdmin from '@/components/BottomAdmin'
import PageWrapper from '@/components/PageWrapper'
import { useEffect, useState } from 'react'

interface ConsumedProduct {
  amount: number | null
  id: string
  description: string
}

const Admin = () => {
  const [consumedProducts, setConsumedProducts] = useState<ConsumedProduct[]>()

  useEffect(() => {
    fetch('/api/consumedProducts').then(async res => {
      setConsumedProducts(await res.json())
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
              consumedProducts.map(product => (
                <div key={product.id}>
                  <p>
                    {product.description} : {product.amount ?? 0}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <BottomAdmin className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Admin
