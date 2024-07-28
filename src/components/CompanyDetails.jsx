import React from "react"

const CompanyDetails = ({ result }) => {
	if (!result) return null

	return (
		<div className='max-w-lg mt-4 p-4 border rounded bg-white'>
			<h2 className='text-2xl font-bold mb-2'>Resultado da Busca:</h2>
			<div>
				<h3 className='text-xl font-bold mt-4'>Dados da Empresa:</h3>
				<p>
					<strong>Razão Social:</strong> {result.companyData.razao_social}
				</p>
				<p>
					<strong>Nome Fantasia:</strong> {result.companyData.nome_fantasia}
				</p>
				<p>
					<strong>Data de Início de Atividade:</strong>{" "}
					{result.companyData.data_inicio_atividade}
				</p>
				<p>
					<strong>Situação Cadastral:</strong>{" "}
					{result.companyData.descricao_situacao_cadastral}
				</p>
				<p>
					<strong>Atividade Principal:</strong>{" "}
					{result.companyData.cnae_fiscal_descricao}
				</p>
				<p>
					<strong>Endereço:</strong> {result.companyData.logradouro},{" "}
					{result.companyData.numero}, {result.companyData.bairro},{" "}
					{result.companyData.municipio}
				</p>
				<p>
					<strong>Telefone:</strong> {result.companyData.ddd_telefone_1}
				</p>
				<p>
					<strong>Email:</strong> {result.companyData.email}
				</p>
			</div>
			<div>
				<h3 className='text-xl font-bold mt-4'>Sócios:</h3>
				{result.socios.map((socio, index) => (
					<div key={index} className='mt-2 p-2 border rounded bg-gray-50'>
						<p>
							<strong>Nome:</strong> {socio.nome_socio}
						</p>
						<p>
							<strong>Faixa Etária:</strong> {socio.faixa_etaria}
						</p>
						<p>
							<strong>CNPJ/CPF:</strong> {socio.cnpj_cpf_do_socio}
						</p>
						<p>
							<strong>Qualificação:</strong> {socio.qualificacao_socio}
						</p>
						<p>
							<strong>Data de Entrada:</strong> {socio.data_entrada_sociedade}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default CompanyDetails
