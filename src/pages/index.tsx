import Image from 'next/image'
import PageWrapper from '@/components/PageWrapper'
import { useSession } from 'next-auth/react'
import BottomMenu from '@/components/BottomMenu'
import Brasao from '@/assets/brasao.png'

export default function Home() {
  const { data } = useSession()

  return (
    <PageWrapper className="!px-0">
      <div className="flex w-full flex-col justify-between pt-6">
        <div className="px-4">
          <div className="flex flex-col justify-center items-center pt-12">
            <h1 className="text-slate-700 text-2xl">Sejam muito bem vindo!</h1>
            <h1 className="text-blue-500 font-bold text-xl">
              {data?.user?.name ?? ''}
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={Brasao}
              width={300}
              height={300}
              alt=""
              className="w-[250px]"
            />
          </div>

          <div className="flex justify-center">
            <p className="text-slate-600 text-center">
              Sejam todos muito bem-vindos ao 6º encontro anual da família
              <strong className="text-blue-500 mx-2">
                Barbosa da Silveira!
              </strong>
              Três dias de alegria, união e momentos inesquecíveis nos esperam.
              Vamos celebrar juntos nossa história e fortalecer laços preciosos.
            </p>
          </div>
        </div>

        <BottomMenu />
      </div>
    </PageWrapper>
  )
}
