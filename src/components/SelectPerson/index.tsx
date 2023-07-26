import { ActionMeta, GroupBase, OptionsOrGroups, Props } from 'react-select'
import Select from 'react-select'

type OptionType = { label: string; value: string }

type OnChange = (
  option: OptionType | null | unknown,
  actionMeta: ActionMeta<unknown>,
) => void | undefined

interface SelectProps extends Props {
  onChange: OnChange
  options: OptionsOrGroups<unknown, GroupBase<unknown>>
}

export const SelectPerson: React.FC<SelectProps> = ({ options, onChange }) => {
  const loading = false

  if (loading) {
    return (
      <div className="w-full min-w-[175px] min-[1080px]:max-w-[250px] min-[1080px]:w-[250px]">
        <Select
          maxMenuHeight={100}
          placeholder="Carregando..."
          isLoading={true}
          options={options}
          isClearable
          onChange={onChange}
        />
      </div>
    )
  }

  return (
    <div className="w-full min-w-[175px] min-[1080px]:max-w-[250px] min-[1080px]:w-[250px]">
      <Select
        maxMenuHeight={130}
        placeholder="Escolha uma pessoa"
        isLoading={!!loading}
        options={options}
        isClearable
        onChange={onChange}
      />
    </div>
  )
}
