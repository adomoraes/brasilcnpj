import React, { useState, useEffect } from "react"
import { cnpjSchema } from "../utils/validation"
import { fetchCnpjData } from "../services/api"
import CompanyDetails from "./CompanyDetails"
import LoadingSpinner from "./LoadingSpinner" // Importe o LoadingSpinner

const SearchBar = () => {
	const [cnpj, setCnpj] = useState("")
	const [error, setError] = useState("")
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const savedData = localStorage.getItem("companyDetails")
		if (savedData) {
			const parsedData = JSON.parse(savedData)
			setResult(parsedData)
		}
	}, [])

	const handleChange = (e) => {
		const value = e.target.value.replace(/\D/g, "") // Remove tudo que não é número
		if (value.length <= 14) {
			setCnpj(formatCnpj(value))
		}
		setError("")
	}

	const formatCnpj = (value) => {
		if (value.length <= 2) return value
		if (value.length <= 5) return value.replace(/(\d{2})(\d+)/, "$1.$2")
		if (value.length <= 8)
			return value.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3")
		if (value.length <= 12)
			return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4")
		return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5")
	}

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			cnpjSchema.parse(cnpj)
			setError("")

			const unmaskedCnpj = cnpj.replace(/\D/g, "") // Remove a máscara antes de buscar os dados
			const savedData = localStorage.getItem("companyDetails")
			if (savedData) {
				const parsedData = JSON.parse(savedData)
				if (parsedData.companyData.cnpj === unmaskedCnpj) {
					setResult(parsedData)
					setLoading(false)
					return
				}
			}

			await delay(2000) // Adiciona um delay de 2 segundos
			const data = await fetchCnpjData(unmaskedCnpj)
			setResult(data)
			localStorage.setItem("companyDetails", JSON.stringify(data)) // Armazena os dados na local storage
		} catch (e) {
			if (e.errors) {
				setError(e.errors[0].message)
			} else {
				setError("Erro ao buscar os dados da empresa")
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='max-w-md mx-auto p-4 bg-white shadow-md rounded'>
			<form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
				<input
					type='text'
					value={cnpj}
					onChange={handleChange}
					className='px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Digite o CNPJ'
				/>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
					Buscar
				</button>
			</form>
			{loading && <LoadingSpinner className='mt-4' />}
			{error && <p className='mt-4 text-red-500'>{error}</p>}
			{result && <CompanyDetails result={result} />}
		</div>
	)
}

export default SearchBar
