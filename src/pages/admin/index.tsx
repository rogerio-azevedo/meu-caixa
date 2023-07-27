import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'

const Admin = () => {
  return (
    <PageWrapper>
      <h1>Área de Administração</h1>

      <div className="flex flex-col gap-2 mt-8">
        <Link href="/persons">Relatórios</Link>
        <Link href="/checkOut">Caixa</Link>
        <Link href="/bar">Bar</Link>
        <Link href="/">Voltar</Link>
      </div>
    </PageWrapper>
  )
}

export default Admin
