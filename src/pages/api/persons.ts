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

  res.status(200).json(persons)
}
