import axios from "axios"

export const fetchCnpjData = async (cnpj) => {
	const cleanedCnpj = cnpj.replace(/\D/g, "")
	const response = await axios.get(
		`https://brasilapi.com.br/api/cnpj/v1/${cleanedCnpj}`
	)
	return response.data
}
