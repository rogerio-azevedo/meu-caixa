import BottomMenu from '@/components/BottomMenu'
import PageWrapper from '@/components/PageWrapper'

const Attractions = () => {
  return (
    <PageWrapper className="!px-0">
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 px-4 mt-6 justify-center">
          <h1 className="text-2xl font-bold text-center">Atrações</h1>
        </div>

        <BottomMenu className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Attractions
