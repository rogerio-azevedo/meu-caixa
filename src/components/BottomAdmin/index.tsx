import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  FaCalculator,
  FaBeer,
  FaHome,
  FaCashRegister,
  FaLock,
} from 'react-icons/fa'

type WrapperProps = {
  bgColor?: string
  className?: string
}

const BottomAdmin = ({ bgColor, className }: WrapperProps) => {
  return (
    <div
      className={classNames(
        'flex flex-row py-2 justify-center bg-teal-600 items-center',
        bgColor && `bg-${bgColor}`,
        className,
      )}
    >
      <div className="flex gap-8">
        <div className="flex flex-col justify-center items-center">
          <Link
            href="/"
            className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
          >
            <FaHome size={18} color="#fff" />
            Home
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Link
            href="/checkOut"
            className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
          >
            <FaCashRegister size={18} color="#fff" />
            Caixa
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Link
            href="/bar"
            className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
          >
            <FaBeer size={18} color="#fff" />
            Bar
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Link
            href="/persons"
            className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
          >
            <FaCalculator size={18} color="#fff" />
            Relatórios
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Link
            href="/admin"
            className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
          >
            <FaLock size={18} color="#fff" />
            Admin
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomAdmin
