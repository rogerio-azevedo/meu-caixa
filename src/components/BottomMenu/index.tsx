import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  FaHistory,
  FaBeer,
  FaHome,
  FaLock,
  FaSignInAlt,
  FaUserAlt,
} from 'react-icons/fa'

type WrapperProps = {
  bgColor?: string
  className?: string
}

const BottomMenu = ({ bgColor, className }: WrapperProps) => {
  const { status, data } = useSession()
  const isAdmin = data?.user?.isAdmin

  return (
    <div
      className={classNames(
        'flex flex-row py-2 justify-center bg-teal-600 items-center',
        bgColor && `bg-${bgColor}`,
        className,
      )}
    >
      {status === 'authenticated' ? (
        <>
          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-center">
              <FaHome size={18} color="#fff" />
              <Link href="/" className="text-white text-sm mt-1">
                Home
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <FaBeer size={18} color="#fff" />
              <Link href="/credit" className="text-white text-sm mt-1">
                Crédito
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <FaHistory size={18} color="#fff" />
              <Link href="/attractions" className="text-white text-sm mt-1">
                Atrações
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <FaHistory size={18} color="#fff" />
              <Link href="/guide" className="text-white text-sm mt-1">
                Roteiro
              </Link>
            </div>

            {isAdmin && (
              <div className="flex flex-col justify-center items-center">
                <FaLock size={18} color="#fff" />
                <Link href="/admin" className="text-white text-sm mt-1">
                  Admin
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-8">
          <div className="flex flex-col justify-center items-center">
            <FaSignInAlt size={18} color="#fff" />
            <Link
              href="/checkIn?signup=false"
              className="text-white text-sm mt-1"
            >
              Entrar
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <FaUserAlt size={18} color="#fff" />
            <Link
              href="/checkIn?signup=true"
              className="text-white text-sm mt-1"
            >
              Registrar
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BottomMenu
