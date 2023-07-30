import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let persons = await prisma.person.findMany({
    select: {
      id: true,
      name: true,
      isAdmin: true,
    },
    orderBy: { name: 'asc' },
  })

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

  const consumoPorPessoa: { [key: string]: number } = formattedUses.reduce(
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

  console.log(
    '🚀 ~ file: persons.ts:34 ~ formattedUses ~ formattedUses:',
    consumoPorPessoa,
  )

  res.status(200).json(persons)
}
