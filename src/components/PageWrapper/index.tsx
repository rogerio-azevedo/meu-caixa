import React, { ReactNode } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

type WrapperProps = {
  children: ReactNode
}

const PageWrapper = ({ children }: WrapperProps) => {
  return (
    <div
      className={`flex flex-1 items-center justify-center px-8 ${inter.className}`}
    >
      <div className="flex flex-1 max-w-3xl h-screen">{children}</div>
    </div>
  )
}

export default PageWrapper
