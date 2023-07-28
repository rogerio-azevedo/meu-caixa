import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { personId } = req.body

  await prisma.credit.updateMany({
    where: {
      personId,
      paid: false,
      amount: {
        gt: 0,
      },
    },
    data: {
      paid: true,
    },
  })

  res.status(200).json('ok')
}
