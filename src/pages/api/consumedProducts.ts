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

  const balance = products.map((product, index) => ({
    ...product,
    amount: results[index]._sum.amount,
  }))

  const uses = await prisma.credit.findMany({
    where: {
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
    price: use.product.price,
  }))

  const objConsumed: { [key: string]: number } = formattedUses.reduce(
    (acumulador: any, pedido: any) => {
      const { person, amount, price } = pedido
      if (!acumulador[person]) {
        acumulador[person] = 0
      }
      acumulador[person] += amount * price
      return acumulador
    },
    {},
  )

  const consumed = Object.entries(objConsumed).map(([person, consumo]) => {
    return { person, consumo }
  })

  res.status(200).json({ balance, consumed })
}
