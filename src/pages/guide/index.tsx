import PageWrapper from '@/components/PageWrapper'
import BottomMenu from '@/components/BottomMenu'

const Guide = () => {
  return (
    <PageWrapper className="!px-0">
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 px-4 justify-center">
          <h1 className="text-2xl font-bold text-center mt-6">Roteiro</h1>
        </div>

        <BottomMenu className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Guide
