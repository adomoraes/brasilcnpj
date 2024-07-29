// src/utils/validation.js
import { z } from "zod"

// Esquema de validação para o CNPJ
export const cnpjSchema = z
	.string()
	.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")

// Esquema de validação para a data (formato dd/mm/yyyy)
const dateRegex = /^(\d{4})\-(\d{2})\-(\d{2})$/
export const dateSchema = z.string().regex(dateRegex, "Data inválida")

// Esquema de validação para o nome
export const nameSchema = z.string().min(1, "Campo obrigatório")

// Esquema de validação para os dados da empresa
export const companyDataSchema = z.object({
	razao_social: nameSchema,
	nome_fantasia: nameSchema,
	data_inicio_atividade: dateSchema,
	descricao_situacao_cadastral: nameSchema,
	cnae_fiscal_descricao: z.string().optional(),
	logradouro: z.string().optional(),
	numero: z.string().optional(),
	bairro: z.string().optional(),
	municipio: z.string().optional(),
	ddd_telefone_1: z.string().optional(),
	email: z.string().email("Email inválido").optional(),
})

// Esquema de validação para os sócios
export const socioSchema = z.object({
	nome_socio: nameSchema,
	faixa_etaria: z.string().optional(),
	cnpj_cpf_do_socio: z.string().optional(),
	qualificacao_socio: z.string().optional(),
	data_entrada_sociedade: dateSchema.optional(),
})

// Esquema de validação para o conjunto completo de dados da empresa e sócios
export const companyDetailsSchema = z.object({
	companyData: companyDataSchema,
	socios: z.array(socioSchema),
})
