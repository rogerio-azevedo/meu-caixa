import { SelectPerson } from '@/components/SelectPerson'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type OptionType = { label: string; value: string }

interface Person {
  id: string
  name: string
}

interface Product {
  id: string
  description: string
  price: number
}

export default function CheckOut() {
  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()
  const [products, setProducts] = useState<Product[]>([])

  const [productsToBuy, setProductsToBuy] = useState<
    Record<string, { id: string; description: string; amount: number }>
  >({})

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })

    fetch('/api/products').then(async res => {
      setProducts(await res.json())
    })
  }, [])

  const handlePickPerson = (id: string) => {
    setSelectedPersonId(id)
  }

  async function handleUpdate() {
    if (selectedPersonId == undefined) {
      return alert('Escolha alguma pessoa primeiro')
    }

    if (Object.values(productsToBuy).length == 0) {
      return alert('Escolha algum produto primeiro')
    }

    let res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        personId: selectedPersonId,
        products: Object.values(productsToBuy),
      }),
    })

    if (res.status == 200) {
      setSelectedPersonId(undefined)
      setProductsToBuy({})
    } else {
      alert('Erro')
    }
  }

  function incrementProductToBuy(product: Product, amount: number) {
    if (productsToBuy[product.id]) {
      productsToBuy[product.id].amount += amount

      if (productsToBuy[product.id].amount == 0) {
        delete productsToBuy[product.id]
      }
    } else {
      productsToBuy[product.id] = {
        amount,
        description: product.description,
        id: product.id,
      }
    }

    setProductsToBuy(() => ({ ...productsToBuy }))
  }

  function getProductPrice(productId: string) {
    return products.find(product => product.id == productId)?.price ?? 0
  }

  function getTotalProductsPrice() {
    return Object.values(productsToBuy).reduce((pv, cv) => {
      if (cv.amount < 0) return pv

      return pv + cv.amount * getProductPrice(cv.id)
    }, 0)
  }

  const totalProductsPrice = getTotalProductsPrice()

  return (
    <div className="flex flex-1 flex-col px-8 justify-center items-center mt-8 gap-4">
      <h1 className="mb-8">Lançamento de Pedido</h1>

      <SelectPerson
        options={persons.map(person => ({
          label: person.name,
          value: person.id,
        }))}
        onChange={(option: any) =>
          handlePickPerson(option && (option as OptionType).value)
        }
      />

      <div className="flex flex-col gap-2 w-full">
        {products.map(product => (
          <div
            className="flex w-full justify-between items-center"
            key={product.id}
          >
            <p>
              {product.description} (R${product.price})
            </p>
            <div className="flex justify-between items-center w-fit gap-8">
              <button
                className="text-4xl"
                onClick={() => incrementProductToBuy(product, -1)}
              >
                -
              </button>
              <p className="font-bold">
                {Object.values(productsToBuy).find(p => p.id == product.id)
                  ?.amount ?? 0}
              </p>
              <button
                className="text-4xl"
                onClick={() => incrementProductToBuy(product, +1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalProductsPrice > 0 && (
        <p>Total adicionado: R${totalProductsPrice}</p>
      )}

      <div className="flex flex-col gap-2 w-full">
        <button
          className="w-full mt-8 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdate}
        >
          Atualizar
        </button>

        <Link
          href="/"
          className="w-full bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}
