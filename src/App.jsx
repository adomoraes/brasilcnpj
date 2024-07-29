import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/brasilcnpj' element={<HomePage />} />
			</Routes>
		</Router>
	)
}

export default App
