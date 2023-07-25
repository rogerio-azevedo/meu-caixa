import { cnpj, cpf } from 'cpf-cnpj-validator'

export const verifyDocument = (document: string) => {
  const hasDocument = !!document
  if (!hasDocument) return

  const isCPF = cpf.isValid(document)
  const isCNPJ = cnpj.isValid(document)

  if (!isCPF && !isCNPJ) return 'Documento inválido'
}
