import BottomMenu from '@/components/BottomMenu'
import PageWrapper from '@/components/PageWrapper'
import { ImSpoonKnife } from 'react-icons/im'
import { GiWaterBottle } from 'react-icons/gi'

const Attractions = () => {
  return (
    <PageWrapper className="!px-0">
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 px-4 mt-6 justify-center">
          <h1 className="text-2xl font-bold text-center">Cardápio</h1>
        </div>

        <div className="h-2/3 px-6 mb-24">
          <div className="relative overflow-y-scroll h-full pt-2">
            <div className="mb-6">
              <h1 className="text-lg font-bold">Bebidas</h1>
              <div className="flex flex-row ml-4 items-center">
                <GiWaterBottle size={18} color="#000" />
                <h2 className="ml-2">{'Refrigerantes'}</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <GiWaterBottle size={18} color="#000" />
                <h2 className="ml-2">{'Cervejas (adquiridas no bar)'}</h2>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-lg font-bold">Almoço na Sexta 28/07</h1>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Maria Izabel</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Frango ao Molho</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Gueroba</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Milho Refogado</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Polenta</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Arroz Branco</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijão</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada Verde</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada de Repolho</h2>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-lg font-bold">Jantar na Sexta 28/07</h1>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Costelinha de Porco com Arroz</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Vaca Atolada</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Macarrão com Carne Moída</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijão Tropeiro</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Sarapatel</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Gueroba</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Arroz Branco</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijão</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada Verde</h2>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-lg font-bold">Almoço no Sábado 29/07 *</h1>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Galinha com Arroz</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Pequi</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Arroz Branco</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijão</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada Verde</h2>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-lg font-bold">Jantar no Sábado 29/07</h1>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Carne ao Molho Madeira</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Frango ao Molho</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Purê de Batata</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Macarrão com Bacon</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Gueroba</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Arroz Branco</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijão</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Creme de Milho</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Farofa de Cenoura</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada Verde</h2>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-lg font-bold">Almoço no Domingo 30/07</h1>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Feijoada</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Costelão</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Mandioca Cozida</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Couve Refogada</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Laranja</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Arroz Branco</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Farofa</h2>
              </div>
              <div className="flex flex-row ml-4 items-center">
                <ImSpoonKnife size={15} color="#000" />
                <h2 className="ml-2">Salada Verde</h2>
              </div>
            </div>
          </div>
        </div>

        <BottomMenu className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Attractions
