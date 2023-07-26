import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let products = await prisma.product.findMany({
    select: {
      id: true,
      description: true,
      price: true,
    },
  })

  res.status(200).json(products)
}
