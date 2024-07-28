import React, { useState } from "react"
import { cnpjSchema } from "../utils/validation"
import { fetchCnpjData } from "../services/api"

const SearchBar = () => {
	const [cnpj, setCnpj] = useState("")
	const [error, setError] = useState("")
	const [result, setResult] = useState(null)

	const handleChange = (e) => {
		setCnpj(e.target.value)
		setError("")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			cnpjSchema.parse(cnpj)
			setError("")
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
			{result && (
				<div className='max-w-lg mt-4 p-4 border rounded bg-white'>
					<h2 className='text-2xl font-bold mb-2'>Resultado da Busca:</h2>
					<p>
						<strong>Data de Abertura:</strong> {result.data_inicio_atividade}
					</p>
					<p>
						<strong>Atividade Principal:</strong> {result.cnae_fiscal_descricao}
					</p>
					<p>
						<strong>Email:</strong> {result.email}
					</p>
					<p>
						<strong>Bairro:</strong> {result.bairro}
					</p>
					<p>
						<strong>Número:</strong> {result.numero}
					</p>
					<p>
						<strong>Município:</strong> {result.municipio}
					</p>
					<p>
						<strong>Logradouro:</strong> {result.logradouro}
					</p>
					<p>
						<strong>Razão Social:</strong> {result.razao_social}
					</p>
					<p>
						<strong>Nome Fantasia:</strong> {result.nome_fantasia}
					</p>
					<p>
						<strong>Telefone:</strong> {result.ddd_telefone_1}
					</p>
					<p>
						<strong>Situação Cadastral:</strong>{" "}
						{result.descricao_situacao_cadastral}
					</p>
				</div>
			)}
		</div>
	)
}

export default SearchBar
