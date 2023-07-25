import Link from "next/link"

export default function CheckOut() {
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
    <div className="w-screen h-screen px-8 justify-center items-center mt-8">
      <Link
        href="/"
        className="w-full mt-2 bg-slate-500 hover:bg-slate-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Voltar
      </Link>
    </div>
  )
}
