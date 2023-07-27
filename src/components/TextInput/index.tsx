import { UseFormRegister } from 'react-hook-form'

interface TextInputProps {
  id: string
  label: string
  placeholder: string
  type?: string
  register: UseFormRegister<any>
}

export function TextInput({ id, label, placeholder, type = 'text', register }: TextInputProps) {
  return (
    <fieldset className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </fieldset>
  )
}