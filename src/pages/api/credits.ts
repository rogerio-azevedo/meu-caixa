import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personId = req.query.personId as string
  console.log('🚀 ~ file: credits.ts:9 ~ personId:', personId)

  const credits = await prisma.credit.findMany({
    where: {
      personId,
      amount: { gt: 0 },
    },
    include: {
      person: true,
      product: true,
    },
  })

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

  const balance: { [productId: string]: number } = formattedUses.reduce(
    (acumulador: any, pedido) => {
      const { product, amount } = pedido
      if (!acumulador[product]) {
        acumulador[product] = 0
      }
      acumulador[product] += amount
      return acumulador
    },
    {},
  )

  console.log(balance)

  //console.log('🚀 ~ file: credits.ts:29 ~ uses:', uses)

  //console.log('🚀 ~ file: credits.ts:15 ~ formattedUses:', formattedUses)

  res.status(200).json({ credits, uses, balance })
}
