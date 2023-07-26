import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

interface CounterProps {
  increment: (count: number) => void
  amount: number
}

export function Counter({ amount, increment }: CounterProps) {
  return (
    <div className="flex justify-between items-center w-fit">
      <div className="flex bg-red-600 rounded-full w-8 h-8 justify-center items-center">
        <button
          className="flex w-8 h-8 justify-center items-center text-4xl"
          onClick={() => increment(-1)}
        >
          <FaAngleDown size={25} color="#fff" />
        </button>
      </div>

      <div className="w-9 text-center">
        <p className="font-bold text-xl">{amount}</p>
      </div>

      <div className="flex bg-lime-600 rounded-full w-8 h-8 justify-center items-center">
        <button
          className="flex w-8 h-8 justify-center items-center text-4xl"
          onClick={() => increment(+1)}
        >
          <FaAngleUp size={25} color="#fff" />
        </button>
      </div>
    </div>
  )
}
