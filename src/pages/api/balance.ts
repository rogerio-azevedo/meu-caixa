import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personId = req.query.personId as string

  const transactions = await prisma.credit.findMany({
    where: { personId },
  })

  // Use o reduce para acumular as quantidades por produto
  const sumByProduct = transactions.reduce((acc: any, obj) => {
    const { amount, productId } = obj

    // Se já existe uma entrada para esse produto, acrescente a quantidade atual
    if (acc[productId]) {
      acc[productId] += amount
    } else {
      // Caso contrário, crie uma nova entrada com a quantidade atual
      acc[productId] = amount
    }

    return acc
  }, {})

  const products = await prisma.product.findMany()

  const balance = products.map(product => ({
    id: product.id,
    product: product.description,
    amount: sumByProduct[product.id] || 0,
  }))

  res.status(200).json(balance)
}
