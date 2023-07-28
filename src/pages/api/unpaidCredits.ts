import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personId = req.query.personId as string

  const unpaidCredits = await prisma.credit.findMany({
    where: {
      personId,
      paid: false,
      amount: {
        gt: 0,
      },
    },
    select: {
      amount: true,
      product: {
        select: {
          price: true,
        },
      },
    },
  })

  const unpaidCreditAmount = unpaidCredits.reduce((acc, credit) => {
    if (credit.amount < 0) return acc
    else {
      return acc + credit.amount * credit.product.price
    }
  }, 0)

  res.status(200).json(unpaidCreditAmount)
}
