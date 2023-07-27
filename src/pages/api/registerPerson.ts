// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { verifyDocument } from '@/utils/verifyDocument'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { name, document, password } = req.body
  console.log("🚀 ~ file: registerPerson.ts:12 ~ document:", document)

  if (!verifyDocument(document)) {
    return res.status(400).send('invalid_document')
  }

  const personAlreadyRegistered =
    (await prisma.person.findUnique({
      where: {
        document,
      },
    })) != null

  if (personAlreadyRegistered) {
    return res.status(400).send('person_already_registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.person.create({
    data: {
      name,
      document,
      password: hashedPassword,
    },
  })

  res.status(200).json('ok')
}
