import React, { useState, useEffect } from "react"
import { cnpjSchema } from "../utils/validation"
import { fetchCnpjData } from "../services/api"
import CompanyDetails from "./CompanyDetails"

const SearchBar = () => {
	const [cnpj, setCnpj] = useState("")
	const [error, setError] = useState("")
	const [result, setResult] = useState(null)

	useEffect(() => {
		const savedData = localStorage.getItem("companyDetails")
		if (savedData) {
			const parsedData = JSON.parse(savedData)
			setResult(parsedData)
		}
	}, [])

	const handleChange = (e) => {
		setCnpj(e.target.value)
		setError("")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			cnpjSchema.parse(cnpj)
			setError("")

			const savedData = localStorage.getItem("companyDetails")
			if (savedData) {
				const parsedData = JSON.parse(savedData)
				if (parsedData.companyData.cnpj === cnpj) {
					setResult(parsedData)
					return
				}
			}

			const data = await fetchCnpjData(cnpj)
			setResult(data)
			alert("CNPJ válido!") //inserir LOADING
		} catch (e) {
			if (e.errors) {
				setError(e.errors[0].message)
			} else {
				setError(e.message)
			}
			setResult(null)
		}
	}

	return (
		<div className='flex flex-col items-center'>
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
			{result && <CompanyDetails result={result} />}
		</div>
	)
}

export default SearchBar
