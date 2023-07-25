import { SelectPerson } from '@/components/SelectPerson'
import Link from 'next/link'

type OptionType = { label: string; value: string }

export default function CheckOut() {
  const handlePickPerson = (person: any) => {
    console.log(person)
  }

  return (
    <div className="flex flex-1 flex-col px-8 justify-center items-center mt-8">
      <h1 className="mb-8">Lançamento de Pedido</h1>

      <SelectPerson
        onChange={(option: any) =>
          handlePickPerson(option && (option as OptionType).value)
        }
      />

      <Link
        href="/"
        className="w-full mt-8 bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Voltar
      </Link>
    </div>
  )
}
