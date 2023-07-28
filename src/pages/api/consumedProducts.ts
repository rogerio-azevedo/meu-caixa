import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      description: true,
    },
  })

  const results = await prisma.$transaction(
    products.map(product => {
      return prisma.credit.aggregate({
        where: {
          amount: {
            lt: 0,
          },
          productId: product.id,
        },
        _sum: {
          amount: true,
        },
      })
    }),
  )

  console.log(results)

  res.status(200).json(
    products.map((product, index) => ({
      ...product,
      amount: results[index]._sum.amount,
    })),
  )
}
