import PageWrapper from '@/components/PageWrapper'
import { Counter } from '@/components/Counter'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Toast } from '@/components/Toast'

import dynamic from 'next/dynamic'
import BottomMenu from '@/components/BottomMenu'
import { useSession } from 'next-auth/react'

const Select = dynamic(() => import('react-select'), { ssr: false })

interface Product {
  id: string
  description: string
}

interface Person {
  id: string
  name: string
}

interface Balance {
  id: string
  amount: number
  product: string
}

type OptionType = { label: string; value: string }

export default function Bar() {
  const [balance, setBalance] = useState<Balance[]>()

  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()

  const [productsToRedeem, setProductsToRedeem] = useState<
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
  }, [])

  useEffect(() => {
    fetch(`/api/balance?personId=${selectedPersonId}`).then(async res => {
      setBalance(await res.json())
      setProductsToRedeem({})
    })
  }, [selectedPersonId])

  function incrementProductToRedeem(product: Product, amount: number) {
    if (!balance || !selectedPersonId) {
      return Toast({
        isSuccessToast: false,
        message: 'Selecione uma pessoa primeiro',
        time: 2000,
      })
    }

    let amountInBalance = balance.find(p => p.id == product.id)?.amount

    if (!amountInBalance) return

    if (productsToRedeem[product.id]) {
      if (amountInBalance + productsToRedeem[product.id].amount + amount < 0) {
        return Toast({
          isSuccessToast: false,
          message: 'A pessoa não tem créditos suficientes',
          time: 2000,
        })
      }

      productsToRedeem[product.id].amount += amount

      if (productsToRedeem[product.id].amount == 0) {
        delete productsToRedeem[product.id]
      }
    } else {
      if (amount > 0) {
        return Toast({
          isSuccessToast: false,
          message: 'Não é possível adicionar créditos por aqui',
          time: 2000,
        })
      }

      productsToRedeem[product.id] = {
        amount,
        description: product.description,
        id: product.id,
      }
    }

    setProductsToRedeem(() => ({ ...productsToRedeem }))
  }

  async function handleTransaction() {
    if (selectedPersonId == undefined) {
      return Toast({
        isSuccessToast: false,
        message: 'Escolha alguma pessoa primeiro',
        time: 2000,
      })
    }

    if (Object.values(productsToRedeem).length == 0) {
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
        products: Object.values(productsToRedeem),
      }),
    })

    if (res.status == 200) {
      setSelectedPersonId(undefined)
      setBalance(undefined)
      setProductsToRedeem({})
      clearSelect()

      return Toast({
        isSuccessToast: true,
        message: 'Transação realizada com sucesso',
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

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <h1> Bar </h1>

        <div className="w-full min-w-[175px] min-[1080px]:max-w-[250px] min-[1080px]:w-[250px]">
          <Select
            key={selectKey}
            id="1"
            maxMenuHeight={130}
            placeholder="Escolha uma pessoa"
            options={persons.map(person => ({
              label: person.name,
              value: person.id,
            }))}
            isClearable
            onChange={(option: any) =>
              setSelectedPersonId(option && (option as OptionType).value)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          {balance?.map(({ id, amount, product }) => (
            <div key={id} className="flex justify-between items-center">
              <p>
                {product}: {amount}
              </p>
              <Counter
                increment={count => {
                  incrementProductToRedeem(
                    {
                      id,
                      description: product,
                    },
                    count,
                  )
                }}
                amount={
                  Object.values(productsToRedeem).find(p => p.id == id)
                    ?.amount ?? 0
                }
              ></Counter>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleTransaction}
          >
            Efetuar transação
          </button>
          <button></button>

          <BottomMenu />
        </div>
      </div>
    </PageWrapper>
  )
}
