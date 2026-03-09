import {useState} from "react"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import API from "../../api/axiosInstance"

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await API.post("/api/auth/signup", {username: username, email: email, password: password})

            toast.success("Signed up successfully")
            localStorage.setItem("token", res.data.token)
            navigate("/")
        } catch (err){  
            if (err.response && err.response.status === 409){
                toast.error("User already exists")
                navigate("/signup")
            }else if (err.response && err.response.data && err.response.data.error){
                toast.error(err.response.data && err.response.data.error)
            }else{
                toast.error("Invalid")
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-white text-2xl font-bold text-center mb-2">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
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
            Submit
          </button>
        </form>
      </div>
    </div>
    )
}

export default SignUp