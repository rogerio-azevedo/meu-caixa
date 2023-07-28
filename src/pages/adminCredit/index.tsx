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

type OptionType = { label: string; value: string }

export default function Credit() {
  const [logs, setLogs] = useState<Log[]>()
  const [balance, setBalance] = useState<Balance[]>()

  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>()

  const [unpaidCreditAmount, setUnpaidCreditAmount] = useState<number>()

  const [selectKey, setSelectKey] = useState(0)

  function clearSelect() {
    setSelectKey(selectKey + 1)
  }

  function refresh() {
    if (!selectedPersonId) return

    fetch(`/api/balance?personId=${selectedPersonId}`, {
      method: 'GET',
    }).then(async res => {
      setBalance(await res.json())
    })

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
  }

  async function payAll() {
    if (!selectedPersonId) {
      return Toast({
        isSuccessToast: false,
        message: 'Selecione uma pessoa primeiro',
        time: 2000,
      })
    }

    const res = await fetch('/api/payCredits', {
      method: 'PUT',
      body: JSON.stringify({
        personId: selectedPersonId,
      }),
    })

    if (res.ok) {
      setSelectedPersonId(undefined)
      setBalance(undefined)
      setLogs(undefined)
      setUnpaidCreditAmount(undefined)
      clearSelect()

      return Toast({
        isSuccessToast: true,
        message: 'Todos os créditos pagos com sucesso',
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

  useEffect(() => {
    fetch('/api/persons').then(async res => {
      setPersons(await res.json())
    })
  }, [])

  useEffect(() => {
    refresh()
  }, [selectedPersonId]) // eslint-disable-line

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center px-4">
          <div className="flex flex-col w-full mt-6 mb-6 justify-center">
            <h1 className="text-2xl font-bold text-center mb-4">
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

            <div className="flex flex-row w-full justify-between mt-6">
              <div className="">
                {balance?.map(({ id, amount, product }) => (
                  <p key={id}>
                    <span>{product}</span>:
                    <span className="font-bold ml-2">{amount}</span>
                  </p>
                ))}
              </div>

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

        <div className="flex flex-col gap-4 w-full">
          <div className="px-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={payAll}
            >
              Pagar todos (
              {unpaidCreditAmount?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }) ?? 0}
              )
            </button>
          </div>

          <BottomAdmin className="flex" />
        </div>
      </div>
    </PageWrapper>
  )
}
