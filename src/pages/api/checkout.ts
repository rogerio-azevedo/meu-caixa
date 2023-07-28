import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

interface Product {
  id: string
  description: string
  amount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { paid, personId, products } = JSON.parse(req.body) as {
    personId: string
    products: Product[]
    paid: boolean
  }

  let token = await getToken({ req })

  if (!token) return console.log('No token')

  const createdByPersonId = token.sub

  if (!createdByPersonId) return console.log('Id is undefined')

  createdByPersonId

  if (createdByPersonId) {
    products.map(async product => {
      await prisma.credit.create({
        data: {
          personId,
          productId: product.id,
          amount: product.amount,
          paid,

          Log: {
            create: [
              {
                description: `${Math.abs(product.amount)} ${
                  product.description
                } ${product.amount > 0 ? 'adicionados' : 'removidos'}`,
                personId,
                createdByPersonId,
              },
            ],
          },
        },
      })
    })
  }

  res.status(200).json('ok')
}
