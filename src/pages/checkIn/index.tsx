import Link from "next/link"

export default function CheckIn() {
  // useEffect(() => {
  //   const body = {
  //     name: "Carlos",
  //     document: "12345678910",
  //     password: "123456",
  //   }

  //   fetch("/api/registerPerson", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   })

  //   console.log("CheckIn")
  // }, [])

  return (
    <form className="w-screen h-screen px-8 justify-center items-center mt-8">
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
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Registrar
        </button>

        <Link
          href="/"
          className="w-full mt-2 bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Voltar
        </Link>
      </div>
    </form>
  )
}
