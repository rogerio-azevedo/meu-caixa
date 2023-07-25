import { useEffect } from "react"

export default function CheckIn() {
  useEffect(() => {
    const body = {
      name: "Carlos",
      document: "12345678910",
      password: "123456",
    }

    fetch("/api/registerPerson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    console.log("CheckIn")
  }, [])

  return (
    <div>
      <h1>CheckIn</h1>
    </div>
  )
}
