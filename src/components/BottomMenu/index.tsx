import { useSession } from 'next-auth/react'
import Link from 'next/link'

const BottomMenu = () => {
  const { status } = useSession()

  return (
    <div className="flex flex-row mt-32 justify-center">
      <Link href="/checkIn">Check In</Link>
      {status == 'authenticated' && (
        <>
          <div className="mx-2">|</div>
          <Link href="/persons">Relatórios</Link>
          <div className="mx-2">|</div>
          <Link href="/credit">Crédito</Link>
          <div className="mx-2">|</div>
          <Link href="/checkOut">Caixa</Link>
          <div className="mx-2">|</div>
          <Link href="/bar">Bar</Link>
        </>
      )}
    </div>
  )
}

export default BottomMenu
