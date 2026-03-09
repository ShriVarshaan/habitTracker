import {Route, Routes} from "react-router"
import LoginPage from "./pages/login/LoginPage.jsx"
import SignUp from "./pages/login/SignUp.jsx"

const App = () => {
    return (
        <div className="min-h-screen w-full">
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
        </div>
    )
}

export default App