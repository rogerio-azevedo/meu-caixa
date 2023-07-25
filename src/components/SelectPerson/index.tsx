import { ActionMeta, GroupBase, OptionsOrGroups, Props } from "react-select"
import Select from "react-select"

type OptionType = { label: string; value: string }

type selectLabel = {
  label: string
}

type OnChange = (
  option: OptionType | null | unknown,
  actionMeta: ActionMeta<unknown>
) => void | undefined

interface SelectProps extends Props {
  onChange: OnChange
  selected?: OptionType
  loading: boolean
  props?: Props
  options: OptionsOrGroups<unknown, GroupBase<unknown>>
  placeholder: string
  isDisabled?: boolean
  value?: unknown
}

export const SelectPerson: React.FC<SelectProps> = ({
  onChange,
  loading,
  options,
  selected,
  placeholder,
  ...rest
}) => {
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
        placeholder={placeholder}
        defaultValue={selected ? selected : ""}
        isLoading={!!loading}
        options={options}
        isClearable
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}
