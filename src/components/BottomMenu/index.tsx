import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  FaBeer,
  FaHome,
  FaLock,
  FaSignInAlt,
  FaUserAlt,
  FaFileAlt,
} from 'react-icons/fa'

import { MdSentimentSatisfiedAlt } from 'react-icons/md'

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
                href="/credit"
                className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
              >
                <FaBeer size={18} color="#fff" />
                Crédito
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Link
                href="/attractions"
                className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
              >
                <MdSentimentSatisfiedAlt size={22} color="#fff" />
                Atrações
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Link
                href="/guide"
                className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
              >
                <FaFileAlt size={18} color="#fff" />
                Roteiro
              </Link>
            </div>

            {isAdmin && (
              <div className="flex flex-col justify-center items-center">
                <Link
                  href="/admin"
                  className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
                >
                  <FaLock size={18} color="#fff" />
                  Admin
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-8">
          <div className="flex flex-col justify-center items-center">
            <Link
              href="/checkIn?signup=false"
              className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
            >
              <FaSignInAlt size={18} color="#fff" />
              Entrar
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Link
              href="/checkIn?signup=true"
              className="text-white text-sm mt-1 flex flex-col justify-center items-center gap-1"
            >
              <FaUserAlt size={18} color="#fff" />
              Registrar
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BottomMenu
