import React, { useState } from "react"
import { cnpjSchema } from "../utils/validation"

const SearchBar = () => {
	const [cnpj, setCnpj] = useState("")
	const [error, setError] = useState("")

	const handleChange = (e) => {
		setCnpj(e.target.value)
		setError("")
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			cnpjSchema.parse(cnpj)
			alert("CNPJ válido!")
			// Adicione a lógica de consulta aqui
		} catch (e) {
			setError(e.errors[0].message)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col items-center'>
			<input
				type='text'
				value={cnpj}
				onChange={handleChange}
				placeholder='Digite o CNPJ'
				className='border p-2 mb-2'
			/>
			{error && <span className='text-red-500'>{error}</span>}
			<button type='submit' className='bg-blue-500 text-white p-2 rounded'>
				Buscar
			</button>
		</form>
	)
}

export default SearchBar
