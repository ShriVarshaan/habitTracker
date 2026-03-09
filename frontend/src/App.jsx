import {Route, Routes} from "react-router"
import LoginPage from "./pages/login/loginPage.jsx"

const App = () => {
    return (
        <div className="min-h-screen w-full">
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </div>
    )
}

export default App