import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import classNames from 'classnames'

const inter = Inter({ subsets: ['latin'] })

type WrapperProps = {
  children: ReactNode
  bgColor?: string
  className?: string
}

const PageWrapper = ({ children, bgColor, className }: WrapperProps) => {
  return (
    <div
      className={classNames(
        `flex flex-1 items-center justify-center ${inter.className}`,
        bgColor && `bg-${bgColor}`,
        className,
      )}
    >
      <div className="flex flex-1 max-w-[500px] h-[100dvh] bg-white">
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
