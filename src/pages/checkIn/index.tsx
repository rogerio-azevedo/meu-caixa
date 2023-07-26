import { signIn, signOut, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { Toast } from '@/components/Toast'
import BottomMenu from '@/components/BottomMenu'

type FormValues = {
  name: string
  document: string
  password: string
}

export default function CheckIn() {
  let { register, handleSubmit } = useForm<FormValues>()
  const { status } = useSession()

  async function login(data: FormValues) {
    let signInRes = await signIn('credentials', {
      name: data.name,
      document: data.document,
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
    let res = await fetch('/api/registerPerson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

  return (
    <form className="w-screen px-8 justify-center items-center mt-8">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nome
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Nome"
          {...register('name')}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="document"
        >
          CPF
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="document"
          type="text"
          placeholder="CPF"
          {...register('document')}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Senha
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Senha"
          {...register('password')}
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-8 gap-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onRegister}
        >
          Registrar
        </button>
        {status == 'authenticated' && (
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        )}

        <BottomMenu />
      </div>
    </form>
  )
}
