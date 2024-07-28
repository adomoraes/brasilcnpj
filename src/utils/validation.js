import { z } from "zod"

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

export const cnpjSchema = z.string().refine((value) => cnpjRegex.test(value), {
	message: "CNPJ inválido. Deve estar no formato 00.000.000/0000-00",
})
