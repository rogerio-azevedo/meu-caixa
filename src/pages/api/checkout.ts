import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

interface Product {
  id: string
  description: string
  amount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { personId, products } = JSON.parse(req.body) as {
    personId: string
    products: Product[]
  }

  let token = await getToken({ req })

  if (!token) return console.log('No token')

  const createdByPersonId = token.sub

  await prisma.$transaction([
    prisma.credit.createMany({
      data: products.map(product => ({
        personId,
        productId: product.id,
        amount: product.amount,
      })),
    }),
    prisma.log.createMany({
      data: products.map(product => ({
        description: `${Math.abs(product.amount)} ${product.description} ${
          product.amount > 0 ? 'adicionados' : 'removidos'
        }`,
        personId,
        createdByPersonId,
      })),
    }),
  ])

  res.status(200).json('ok')
}
