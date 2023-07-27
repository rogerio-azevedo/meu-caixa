import { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import { Toast } from '@/components/Toast'
import Image from 'next/image'
import Brasao from '@/assets/brasao.png'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PageWrapper from '@/components/PageWrapper'
import { TextInput } from '@/components/TextInput'

import { formatCPForCNPJ } from '@/utils/mask/formatDocument'

type FormValues = {
  name: string
  document: string
  password: string
}

export default function CheckIn() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>()
  const { status } = useSession()

  const formatDocument = watch('document')

  const searchParams = useSearchParams()
  const isSignUp = JSON.parse(searchParams.get('signup') ?? 'true') as boolean

  async function login(data: FormValues) {
    const signInRes = await signIn('credentials', {
      name: data.name,
      document: formatDocument.replace(/[^\d]/g, '').trim(),
      password: data.password,
      redirect: false,
    })

    if (signInRes?.ok === true) {
      Router.push('/')
    } else {
      return Toast({
        isSuccessToast: false,
        message: 'Erro no login, cheque suas credenciais',
        time: 2000,
      })
    }
  }

  const onRegister = handleSubmit(async data => {
    const newData = {
      ...data,
      document: formatDocument.replace(/[^\d]/g, '').trim(),
    }

    const res = await fetch('/api/registerPerson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })

    if ((await res.text()) == 'invalid_document') {
      return Toast({
        isSuccessToast: false,
        message: 'O CPF provido é inválido',
        time: 2000,
      })
    } else {
      await login(data)
    }
  })

  const onLogin = handleSubmit(async data => {
    await login(data)
  })

  useEffect(() => {
    setValue('document', formatCPForCNPJ(formatDocument))
  }, [formatDocument, setValue])

  return (
    <PageWrapper>
      <form className="flex flex-col w-full px-8 justify-center items-center mt-6">
        <div className="flex justify-center items-center">
          <Image
            src={Brasao}
            width={200}
            height={200}
            alt=""
            className="w-[180px]"
          />
        </div>

        <div className="flex flex-col w-full">
          {isSignUp && (
            <TextInput
              id="name"
              label="Nome"
              placeholder="Nome"
              register={register}
            />
          )}
        </div>

        <TextInput
          id="document"
          label="CPF"
          placeholder="000.000.00-00"
          register={register}
        />

        <TextInput
          id="password"
          label="Senha"
          placeholder="Senha"
          type="password"
          register={register}
        />

        <div className="flex flex-col w-full items-center justify-center mt-8 gap-2">
          {isSignUp ? (
            <>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onRegister}
              >
                Registrar
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onLogin}
              >
                Entrar
              </button>
            </>
          )}
          {status == 'authenticated' && (
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          )}

          <Link
            href="/"
            className="w-full bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
          >
            Voltar
          </Link>
        </div>
      </form>
    </PageWrapper>
  )
}
