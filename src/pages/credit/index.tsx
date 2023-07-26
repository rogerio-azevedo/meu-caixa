import PageWrapper from '@/components/PageWrapper'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { parseISO, format } from 'date-fns'
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

  useEffect(() => {
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
  }, [data])

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <h1> Meu Crédito</h1>

        <div>
          {balance?.map(({ id, amount, product }) => (
            <p key={id}>
              {product}: {amount}
            </p>
          ))}
        </div>

        <div className="h-1/2">
          <ol className="relative border-l border-gray-200 dark:border-gray-700 overflow-y-scroll h-full">
            {logs?.map(({ id, date, description }) => (
              <li className="mb-10 ml-4" key={id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {/* {format(parseISO(date), 'dd/MM/yyyy HH:mm:ss')} */}
                  {date}
                </time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex">
          <BottomMenu />
        </div>
      </div>
    </PageWrapper>
  )
}
