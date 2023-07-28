import BottomAdmin from '@/components/BottomAdmin'
import BottomMenu from '@/components/BottomMenu'
import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'

const Admin = () => {
  return (
    <PageWrapper>
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 px-4 mt-6 justify-center">
          <h1 className="text-2xl font-bold text-center">
            Painel Administrativo
          </h1>
        </div>

        <BottomAdmin className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Admin
