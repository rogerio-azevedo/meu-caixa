import { cnpj, cpf } from 'cpf-cnpj-validator';

export function formatCPForCNPJ(value: string | undefined) {
  if (!value) return '';

  const cleanedValue = value.replace(/\D/g, '');

  const maxLength = 14;
  if (cleanedValue.length > maxLength) {
    return cleanedValue.slice(0, maxLength);
  }

  if (cleanedValue.length <= 11) {
    return cpf.format(cleanedValue)
  } else if (cleanedValue.length > 11 && cleanedValue.length <= 14) {
    return cnpj.format(cleanedValue)
  } else {
    return cleanedValue;
  }
}