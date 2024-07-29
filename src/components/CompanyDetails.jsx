import React, { useState, useEffect } from "react"
import { companyDetailsSchema, socioSchema } from "../utils/validation"

const formatDate = (dateString) => {
	const date = new Date(dateString)
	return date.toLocaleDateString("pt-BR")
}

const parseDate = (dateString) => {
	const [day, month, year] = dateString.split("/")
	return new Date(`${year}-${month}-${day}`)
}

const CompanyDetails = ({ result }) => {
	const [companyData, setCompanyData] = useState(result?.companyData || {})
	const [socios, setSocios] = useState(result?.socios || [])
	const [error, setError] = useState("")
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		if (result) {
			setCompanyData(result.companyData)
			setSocios(result.socios)
		}
	}, [result])

	useEffect(() => {
		const savedData = localStorage.getItem("companyDetails")
		if (savedData) {
			const parsedData = JSON.parse(savedData)
			setCompanyData(parsedData.companyData)
			setSocios(parsedData.socios)
		}
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === "data_inicio_atividade") {
			const parsedDate = parseDate(value)
			setCompanyData((prevState) => ({
				...prevState,
				[name]: formatDate(parsedDate),
			}))
		} else {
			setCompanyData((prevState) => ({
				...prevState,
				[name]: value,
			}))
		}
	}

	const handleSocioChange = (index, e) => {
		const { name, value } = e.target
		if (name === "data_entrada_sociedade") {
			const parsedDate = parseDate(value)
			const formattedDate = formatDate(parsedDate)
			const newSocios = [...socios]
			newSocios[index][name] = formattedDate
			setSocios(newSocios)
		} else {
			const newSocios = [...socios]
			newSocios[index][name] = value
			setSocios(newSocios)
		}
	}

	const handleSave = () => {
		setError("")
		const dataToSave = {
			companyData,
			socios,
		}

		try {
			companyDetailsSchema.parse(dataToSave)
			socios.forEach((socio) => {
				socioSchema.parse(socio)
			})
			localStorage.setItem("companyDetails", JSON.stringify(dataToSave))
			alert("Dados salvos com sucesso!")
		} catch (e) {
			if (e.errors) {
				setError(e.errors[0].message)
			} else {
				setError("Erro desconhecido durante a validação.")
			}
		}
	}

	return (
		<div
			className={`max-w-3xl mx-auto mt-4 p-6 border rounded-lg shadow-lg ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
			<button
				onClick={() => setDarkMode(!darkMode)}
				className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}>
				{darkMode ? "🌞" : "🌙"}
			</button>
			<h2 className='text-3xl font-bold mb-4'>Resultado da Busca:</h2>
			{error && <p className='mt-4 text-red-500'>{error}</p>}
			<div>
				<h3 className='text-2xl font-semibold mt-4'>Dados da Empresa:</h3>
				<form className='space-y-4'>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='razao_social'>
							Razão Social:
						</label>
						<input
							type='text'
							id='razao_social'
							name='razao_social'
							value={companyData.razao_social || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='nome_fantasia'>
							Nome Fantasia:
						</label>
						<input
							type='text'
							id='nome_fantasia'
							name='nome_fantasia'
							value={companyData.nome_fantasia || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='data_inicio_atividade'>
							Data de Início de Atividade:
						</label>
						<input
							type='text'
							id='data_inicio_atividade'
							name='data_inicio_atividade'
							value={formatDate(companyData.data_inicio_atividade) || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label
							className='font-semibold'
							htmlFor='descricao_situacao_cadastral'>
							Situação Cadastral:
						</label>
						<input
							type='text'
							id='descricao_situacao_cadastral'
							name='descricao_situacao_cadastral'
							value={companyData.descricao_situacao_cadastral || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='cnae_fiscal_descricao'>
							Atividade Principal:
						</label>
						<input
							type='text'
							id='cnae_fiscal_descricao'
							name='cnae_fiscal_descricao'
							value={companyData.cnae_fiscal_descricao || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='logradouro'>
							Endereço:
						</label>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								id='logradouro'
								name='logradouro'
								value={companyData.logradouro || ""}
								onChange={handleChange}
								placeholder='Logradouro'
								className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
							/>
							<input
								type='text'
								id='numero'
								name='numero'
								value={companyData.numero || ""}
								onChange={handleChange}
								placeholder='Número'
								className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/4 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
							/>
							<input
								type='text'
								id='bairro'
								name='bairro'
								value={companyData.bairro || ""}
								onChange={handleChange}
								placeholder='Bairro'
								className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/4 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
							/>
							<input
								type='text'
								id='municipio'
								name='municipio'
								value={companyData.municipio || ""}
								onChange={handleChange}
								placeholder='Município'
								className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
							/>
						</div>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='ddd_telefone_1'>
							Telefone:
						</label>
						<input
							type='text'
							id='ddd_telefone_1'
							name='ddd_telefone_1'
							value={companyData.ddd_telefone_1 || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='font-semibold' htmlFor='email'>
							Email:
						</label>
						<input
							type='text'
							id='email'
							name='email'
							value={companyData.email || ""}
							onChange={handleChange}
							className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
						/>
					</div>
				</form>
			</div>
			<div>
				<h3 className='text-2xl font-semibold mt-4'>Sócios:</h3>
				{socios.map((socio, index) => (
					<div
						key={index}
						className={`mt-4 p-4 border rounded-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}>
						<form className='space-y-4'>
							<div className='flex flex-col'>
								<label
									className='font-semibold'
									htmlFor={`nome_socio_${index}`}>
									Nome:
								</label>
								<input
									type='text'
									id={`nome_socio_${index}`}
									name='nome_socio'
									value={socio.nome_socio || ""}
									onChange={(e) => handleSocioChange(index, e)}
									className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-semibold'
									htmlFor={`faixa_etaria_${index}`}>
									Faixa Etária:
								</label>
								<input
									type='text'
									id={`faixa_etaria_${index}`}
									name='faixa_etaria'
									value={socio.faixa_etaria || ""}
									onChange={(e) => handleSocioChange(index, e)}
									className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-semibold'
									htmlFor={`cnpj_cpf_do_socio_${index}`}>
									CNPJ/CPF:
								</label>
								<input
									type='text'
									id={`cnpj_cpf_do_socio_${index}`}
									name='cnpj_cpf_do_socio'
									value={socio.cnpj_cpf_do_socio || ""}
									onChange={(e) => handleSocioChange(index, e)}
									className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-semibold'
									htmlFor={`qualificacao_socio_${index}`}>
									Qualificação:
								</label>
								<input
									type='text'
									id={`qualificacao_socio_${index}`}
									name='qualificacao_socio'
									value={socio.qualificacao_socio || ""}
									onChange={(e) => handleSocioChange(index, e)}
									className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-semibold'
									htmlFor={`data_entrada_sociedade_${index}`}>
									Data de Entrada:
								</label>
								<input
									type='text'
									id={`data_entrada_sociedade_${index}`}
									name='data_entrada_sociedade'
									value={formatDate(socio.data_entrada_sociedade) || ""}
									onChange={(e) => handleSocioChange(index, e)}
									className={`mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
								/>
							</div>
						</form>
					</div>
				))}
			</div>
			<button
				onClick={handleSave}
				className={`mt-4 p-2 rounded-lg shadow-md ${darkMode ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
				Salvar
			</button>
		</div>
	)
}

export default CompanyDetails
