import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"

type EventsSearchBarProps = {
  setValue: (a: string) => void
}

const MarketsSearchBar = ({ setValue }: EventsSearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(inputValue, 500)

  useEffect(() => {
    setValue(debouncedValue)
  }, [debouncedValue, setValue])

  return (
    <input
      onChange={e => setInputValue(e.target.value)}
      value={inputValue}
      type="text"
      className="w-full py-2 px-1 border border-white rounded-xl"
    />
  )
}

export default MarketsSearchBar
