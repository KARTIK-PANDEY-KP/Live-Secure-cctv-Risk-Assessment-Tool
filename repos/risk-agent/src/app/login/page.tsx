import LoginForm from "../../components/LoginForm"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-[#003087]">Welcome to Risk Assessment AI</h1>
      <LoginForm />
    </main>
  )
}

