import React from "react"
import SearchBar from "../components/SearchBar"

const HomePage = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-8'>Consulta de CNPJ</h1>
			<SearchBar />
		</div>
	)
}

export default HomePage
