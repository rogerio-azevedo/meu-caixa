import PageWrapper from '@/components/PageWrapper'
import BottomMenu from '@/components/BottomMenu'

const Guide = () => {
  const guide = [
    {
      id: 0,
      date: 'Sexta - 28/07/2023 07:00',
      description: 'Café da manha',
    },
    {
      id: 1,
      date: 'Sexta - 28/07/2023 09:30',
      description: 'Atividades',
    },
    {
      id: 2,
      date: 'Sexta - 28/07/2023 12:00',
      description: 'Almoço',
    },
    {
      id: 3,
      date: 'Sexta - 28/07/2023 13:30',
      description: 'Bingo',
    },
    {
      id: 4,
      date: 'Sexta - 28/07/2023 15:00',
      description: 'Lanche da tarde',
    },
    {
      id: 5,
      date: 'Sexta - 28/07/2023 15:30',
      description: 'Atividades',
    },
    {
      id: 6,
      date: '28/07/2023 19:00',
      description: 'Jantar',
    },
    {
      id: 7,
      date: 'Sexta - 28/07/2023 20:00',
      description: 'Show com Maya Andrade',
    },
    {
      id: 8,
      date: '-------------------------',
      description: '',
    },
    {
      id: 9,
      date: 'Sábado - 29/07/2023 07:00',
      description: 'Café da manha',
    },
    {
      id: 10,
      date: 'Sábado - 29/07/2023 09:30',
      description: 'Atividades',
    },
    {
      id: 11,
      date: 'Sábado - 29/07/2023 11:00',
      description: 'Roda de Viola',
    },
    {
      id: 12,
      date: 'Sábado - 29/07/2023 13:00',
      description: 'Almoço',
    },
    {
      id: 13,
      date: 'Sábado - 29/07/2023 15:00',
      description: 'Lanche da tarde',
    },
    {
      id: 14,
      date: 'Sábado - 29/07/2023 16:00',
      description: 'Foto Oficial',
    },
    {
      id: 15,
      date: 'Sábado - 29/07/2023 19:00',
      description: 'Apresentação regional',
    },
    {
      id: 16,
      date: 'Sábado - 29/07/2023 20:00',
      description: 'Jantar',
    },
    {
      id: 17,
      date: 'Sábado - 29/07/2023 21:00',
      description: 'Festa Junina',
    },
    {
      id: 18,
      date: 'Sábado - 29/07/2023 22:00',
      description: 'Baile com DJ',
    },
    {
      id: 19,
      date: '-------------------------',
      description: '',
    },
    {
      id: 20,
      date: 'Domingo - 30/07/2023 07:00',
      description: 'Café da manha',
    },
    {
      id: 21,
      date: 'Domingo - 30/07/2023 09:30',
      description: 'Atividades',
    },
    {
      id: 22,
      date: 'Domingo - 30/07/2023 12:00',
      description: 'Almoço',
    },
  ]

  return (
    <PageWrapper className="!px-0">
      <div className=" flex flex-col w-full justify-between">
        <div className="flex flex-1 px-4 justify-center">
          <h1 className="text-2xl font-bold text-center mt-6">
            Programação da Festa
          </h1>
        </div>

        <div className="h-2/3 px-4 mb-24">
          <ul className="relative border-l border-gray-200 dark:border-gray-700 overflow-y-scroll h-full pt-2">
            {guide?.map(({ id, date, description }) => (
              <li className="mb-6 ml-6" key={id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 left-[6px] border border-white dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-blue-800">
                  {date}
                </time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <BottomMenu className="flex" />
      </div>
    </PageWrapper>
  )
}

export default Guide
