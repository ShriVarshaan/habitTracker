import API from "../../api/axiosInstance"
import { useState } from "react"
import toast from "react-hot-toast"
const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await API.post("/api/auth/login", {username: username, email: email, password: password})

            localStorage.setItem("token", res.data.token)
        }catch (err){
            toast.error("Invalid credentials")
        }
        
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-white text-2xl font-bold text-center mb-2">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-indigo-500 transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-indigo-500 transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            className="mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    )
}

export default LoginPage