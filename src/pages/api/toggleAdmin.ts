// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { id, isAdmin } = JSON.parse(req.body) as {
    id: string
    isAdmin: boolean
  }

  await prisma.person.update({
    where: {
      id,
    },
    data: {
      isAdmin,
    },
  })

  res.status(200).json('ok')
}
