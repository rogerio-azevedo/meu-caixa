import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personId = req.query.personId as string

  const positiveCredits = await prisma.credit.findMany({
    where: {
      personId,
      amount: { gt: 0 },
    },
    include: {
      person: true,
      product: true,
    },
  })

  const formattedCredits = positiveCredits.map(use => ({
    creditId: use.id,
    amount: use.amount,
    paid: use.paid,
    person: use.person.name,
    product: use.product.description,
  }))

  const uses = await prisma.credit.findMany({
    where: {
      personId,
      amount: { lt: 0 },
    },
    include: {
      person: true,
      product: true,
    },
  })

  const formattedUses = uses.map(use => ({
    creditId: use.id,
    amount: use.amount,
    paid: use.paid,
    person: use.person.name,
    product: use.product.description,
  }))

  const negativeBalance = formattedUses.reduce((acumulador, pedido) => {
    const { product, amount } = pedido
    if (!acumulador[product]) {
      acumulador[product] = 0
    }
    acumulador[product] += amount
    return acumulador
  }, {} as { [productId: string]: number })

  const totalBalance = formattedCredits.reduce(
    (acc, { product, amount }) => {
      if (!acc[product]) {
        acc[product] = 0
      }

      acc[product] += amount

      return acc
    },
    formattedUses.reduce((acc, { product, amount }) => {
      if (!acc[product]) {
        acc[product] = 0
      }

      acc[product] += amount

      return acc
    }, {} as { [productId: string]: number }),
  )

  res.status(200).json({ positiveCredits, totalBalance, negativeBalance })
}
