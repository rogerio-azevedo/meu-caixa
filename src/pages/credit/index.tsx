import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'

export default function Credit() {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col justify-between py-8">
        <h1> Meu Crédito</h1>

        <div className="flex">
          <Link
            href="/"
            className="w-full mt-2 bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Voltar
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
