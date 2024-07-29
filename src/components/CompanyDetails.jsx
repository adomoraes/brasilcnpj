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
		// Limpa a mensagem de erro antes de começar a validação
		setError("")
		const dataToSave = {
			companyData,
			socios,
		}

		try {
			// Validação dos dados com o schema da empresa
			companyDetailsSchema.parse(dataToSave)

			// Validação dos dados dos sócios
			socios.forEach((socio) => {
				socioSchema.parse(socio)
			})

			// Salvamento dos dados
			localStorage.setItem("companyDetails", JSON.stringify(dataToSave))
			alert("Dados salvos com sucesso!")
		} catch (e) {
			// Tratamento de erros de validação
			if (e.errors) {
				setError(e.errors[0].message)
			} else {
				setError("Erro desconhecido durante a validação.")
			}
		}
	}

	return (
		<div className='max-w-lg mt-4 p-4 border rounded bg-white'>
			<h2 className='text-2xl font-bold mb-2'>Resultado da Busca:</h2>
			{error && <p className='mt-4 text-red-500'>{error}</p>}
			<div>
				<h3 className='text-xl font-bold mt-4'>Dados da Empresa:</h3>
				<p>
					<strong>Razão Social:</strong>
					<input
						type='text'
						name='razao_social'
						value={companyData.razao_social || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Nome Fantasia:</strong>
					<input
						type='text'
						name='nome_fantasia'
						value={companyData.nome_fantasia || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Data de Início de Atividade:</strong>
					<input
						type='text'
						name='data_inicio_atividade'
						value={formatDate(companyData.data_inicio_atividade) || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Situação Cadastral:</strong>
					<input
						type='text'
						name='descricao_situacao_cadastral'
						value={companyData.descricao_situacao_cadastral || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Atividade Principal:</strong>
					<input
						type='text'
						name='cnae_fiscal_descricao'
						value={companyData.cnae_fiscal_descricao || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Endereço:</strong>
					<input
						type='text'
						name='logradouro'
						value={companyData.logradouro || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
					<input
						type='text'
						name='numero'
						value={companyData.numero || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
					<input
						type='text'
						name='bairro'
						value={companyData.bairro || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
					<input
						type='text'
						name='municipio'
						value={companyData.municipio || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Telefone:</strong>
					<input
						type='text'
						name='ddd_telefone_1'
						value={companyData.ddd_telefone_1 || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
				<p>
					<strong>Email:</strong>
					<input
						type='text'
						name='email'
						value={companyData.email || ""}
						onChange={handleChange}
						className='ml-2 p-1 border rounded'
					/>
				</p>
			</div>
			<div>
				<h3 className='text-xl font-bold mt-4'>Sócios:</h3>
				{socios.map((socio, index) => (
					<div key={index} className='mt-2 p-2 border rounded bg-gray-50'>
						<p>
							<strong>Nome:</strong>
							<input
								type='text'
								name='nome_socio'
								value={socio.nome_socio || ""}
								onChange={(e) => handleSocioChange(index, e)}
								className='ml-2 p-1 border rounded'
							/>
						</p>
						<p>
							<strong>Faixa Etária:</strong>
							<input
								type='text'
								name='faixa_etaria'
								value={socio.faixa_etaria || ""}
								onChange={(e) => handleSocioChange(index, e)}
								className='ml-2 p-1 border rounded'
							/>
						</p>
						<p>
							<strong>CNPJ/CPF:</strong>
							<input
								type='text'
								name='cnpj_cpf_do_socio'
								value={socio.cnpj_cpf_do_socio || ""}
								onChange={(e) => handleSocioChange(index, e)}
								className='ml-2 p-1 border rounded'
							/>
						</p>
						<p>
							<strong>Qualificação:</strong>
							<input
								type='text'
								name='qualificacao_socio'
								value={socio.qualificacao_socio || ""}
								onChange={(e) => handleSocioChange(index, e)}
								className='ml-2 p-1 border rounded'
							/>
						</p>
						<p>
							<strong>Data de Entrada:</strong>
							<input
								type='text'
								name='data_entrada_sociedade'
								value={formatDate(socio.data_entrada_sociedade) || ""}
								onChange={(e) => handleSocioChange(index, e)}
								className='ml-2 p-1 border rounded'
							/>
						</p>
					</div>
				))}
			</div>
			<button
				onClick={handleSave}
				className='mt-4 p-2 bg-blue-500 text-white rounded'>
				Salvar
			</button>
		</div>
	)
}

export default CompanyDetails
