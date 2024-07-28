import axios from "axios"

export const fetchCnpjData = async (cnpj) => {
	const cleanedCnpj = cnpj.replace(/\D/g, "")
	const response = await axios.get(
		`https://brasilapi.com.br/api/cnpj/v1/${cleanedCnpj}`
	)
	if (response.status !== 200) {
		throw new Error("Erro ao buscar dados do CNPJ")
	}

	const data = response.data

	const companyData = {
		razao_social: data.razao_social,
		nome_fantasia: data.nome_fantasia,
		data_inicio_atividade: data.data_inicio_atividade,
		descricao_situacao_cadastral: data.descricao_situacao_cadastral,
		cnae_fiscal_descricao: data.cnae_fiscal_descricao,
		bairro: data.bairro,
		numero: data.numero,
		municipio: data.municipio,
		logradouro: data.logradouro,
		ddd_telefone_1: data.ddd_telefone_1,
		email: data.email,
	}

	const socios = data.qsa.map((socio) => ({
		nome_socio: socio.nome_socio,
		faixa_etaria: socio.faixa_etaria,
		cnpj_cpf_do_socio: socio.cnpj_cpf_do_socio,
		qualificacao_socio: socio.qualificacao_socio,
		data_entrada_sociedade: socio.data_entrada_sociedade,
	}))

	return {
		companyData,
		socios,
	}
}
