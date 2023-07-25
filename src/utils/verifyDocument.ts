import { cnpj, cpf } from 'cpf-cnpj-validator'

export const verifyDocument = (document: string) => {
  const isCPF = cpf.isValid(document)
  const isCNPJ = cnpj.isValid(document)

  return isCPF || isCNPJ
}
