// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const register = await prisma.person.create({
    data: {
      name: "Carlos",
      document: "12345678910",
      password: "123456",
    },
  })
  console.log("🚀 ~ file: hello.ts:20 ~ register:", register)

  res.status(200).json({ name: "John Doe" })
}
