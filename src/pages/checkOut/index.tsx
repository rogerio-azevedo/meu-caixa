import { SelectPerson } from '@/components/SelectPerson'
import { Counter } from '@/components/Counter'
import { useEffect, useState } from 'react'
import { Toast } from '@/components/Toast'
import BottomMenu from '@/components/BottomMenu'

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

  const [selectKey, setSelectKey] = useState(0)

  function clearSelect() {
    setSelectKey(selectKey + 1)
  }

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
      return Toast({
        isSuccessToast: false,
        message: 'Escolha alguma pessoa primeiro',
        time: 2000,
      })
    }

    if (Object.values(productsToBuy).length == 0) {
      return Toast({
        isSuccessToast: false,
        message: 'Escolha algum produto primeiro',
        time: 2000,
      })
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

      clearSelect()

      return Toast({
        isSuccessToast: true,
        message: 'Pedido realizado com sucesso',
        time: 2000,
      })
    } else {
      return Toast({
        isSuccessToast: false,
        message: 'Erro',
        time: 2000,
      })
    }
  }

  function incrementProductToBuy(product: Product, amount: number) {
    if (!selectedPersonId) {
      return Toast({
        isSuccessToast: false,
        message: 'Selecione uma pessoa primeiro',
        time: 2000,
      })
    }

    if (productsToBuy[product.id]) {
      productsToBuy[product.id].amount += amount

      if (productsToBuy[product.id].amount == 0) {
        delete productsToBuy[product.id]
      }
    } else {
      if (amount <= 0) {
        return Toast({
          isSuccessToast: false,
          message: 'Não é possível remover créditos por aqui',
          time: 2000,
        })
      }

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

  //const [appStateVisible, setAppStateVisible] = useState(Date.now())

  return (
    <div className="flex flex-1 flex-col px-8 justify-center items-center mt-8 gap-4">
      <h1 className="mb-8">Lançamento de Pedido</h1>

      <SelectPerson
        key={selectKey}
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
            <p className="text-sm">
              {product.description} (
              {product.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
              )
            </p>
            <Counter
              increment={count => {
                incrementProductToBuy(product, count)
              }}
              amount={
                Object.values(productsToBuy).find(p => p.id == product.id)
                  ?.amount ?? 0
              }
            ></Counter>
          </div>
        ))}
      </div>

      <p>
        Total adicionado:{' '}
        {totalProductsPrice.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>

      <div className="flex flex-col gap-2 w-full">
        <button
          className="w-full mt-8 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdate}
        >
          Efetuar pedido
        </button>

        <BottomMenu />
      </div>
    </div>
  )
}
