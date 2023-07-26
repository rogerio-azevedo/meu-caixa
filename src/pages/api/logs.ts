import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const personId = req.query.personId as string

  const logs = await prisma.log.findMany({
    where: {
      personId,
    },
    include: {
      Person: true,
      CreatedBy: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const formatted = logs.map(log => ({
    id: log.id,
    date: log.created_at.toLocaleString(),
    description: `${log.description} para ${log.Person.name} pelo ${log.CreatedBy.name} `,
  }))

  res.status(200).json(formatted)
}
