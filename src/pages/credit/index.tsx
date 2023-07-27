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

export default function Credit() {
  const [logs, setLogs] = useState<Log[]>()
  const [balance, setBalance] = useState<Balance[]>()
  const { data } = useSession()

  function refresh() {
    if (!data) return

    fetch(`/api/balance?personId=${data.user.id}`, {
      method: 'GET',
    }).then(async res => {
      setBalance(await res.json())
    })

    fetch(`/api/logs?personId=${data.user.id}`, {
      method: 'GET',
    }).then(async res => {
      setLogs(await res.json())
    })
  }

  useEffect(() => {
    refresh()
  }, [data]) // eslint-disable-line

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between">
        <div className="flex items-center px-4">
          <div className="flex flex-col w-full mt-6 justify-center">
            <h1 className="text-2xl font-bold text-center"> Meu Crédito</h1>

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

        <div className="h-1/2 px-4 mb-24">
          <h2 className="text-xl font-bold text-center mb-6">
            Histórico de transações
          </h2>
          <ol className="relative border-l border-gray-200 dark:border-gray-700 overflow-y-scroll h-full">
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
