// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  id: string
  name: string
  document: string
  password: string
  created_at: Date
  updated_at: Date
  excluded_at: Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { name, document, password } = req.body

  const register = await prisma.person.create({
    data: {
      name: "Marta",
      document: "001234567800",
      password: "123456",
    },
  })
  console.log("🚀 ~ file: registerPerson.ts:24 ~ register:", register)

  res.status(200).json({ register: "ok" })
}
