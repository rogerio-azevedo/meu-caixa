import PageWrapper from '@/components/PageWrapper'
import { useSession } from 'next-auth/react'
import BottomMenu from '@/components/BottomMenu'

export default function Home() {
  const { data } = useSession()

  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <div className="">
          <div className="flex flex-col justify-center items-center pt-16">
            <h1 className="text-slate-700 text-2xl">Sejam muito bem vindo!</h1>
            <h1 className="text-blue-500 font-bold text-xl">
              {data?.user?.name ?? ''}
            </h1>
          </div>

          <div className="flex justify-center mt-8">
            <p className="text-slate-600 text-center">
              Sejam todos bem-vindos ao 6º encontro anual da família Barbosa da
              Silveira! Três dias de alegria, união e momentos inesquecíveis nos
              esperam. Vamos celebrar juntos nossa história e fortalecer laços
              preciosos.
            </p>
          </div>
        </div>

        <BottomMenu />
      </div>
    </PageWrapper>
  )
}
