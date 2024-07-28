import React from "react"

const CompanyDetails = ({ result }) => {
	if (!result) return null

	return (
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
	)
}

export default CompanyDetails