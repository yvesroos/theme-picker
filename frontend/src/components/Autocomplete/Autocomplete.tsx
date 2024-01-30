import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./Autocomplete.css";
import AutocompleteInput from "./AutocompleteInput";
import AutocompleteList from "./AutocompleteList";
import AutocompleteListItem from "./AutocompleteListItem";
import AutocompleteListItemEmpty from "./AutocompleteListItemEmpty";
import AutocompleteListItemNotFound from "./AutocompleteListItemNotFound";
import useDebounce from "../../hooks/useDebounce";
import { ListItem } from "./types";
import { ARROW_DOWN_KEY, ARROW_UP_KEY, ENTER_KEY, ESC_KEY } from "../../consts";

const Autocomplete = <T,>({
  values,
  defaultSelectedValue,
  onChange,
  onSelect,
}: {
  values?: ListItem<T>[];
  defaultSelectedValue?: ListItem<T>;
  onChange: (value: string | undefined) => void;
  onSelect: (value: ListItem<T>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, setIsFocused] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  const [searchValue, setSearchValue] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [debounceValue] = useDebounce<string>(searchValue);

  const isEmptySearch = searchValue.length === 0;
  const notFoundResults = !values?.length && !isEmptySearch;

  const resetHighlightIndex = () => {
    setHighlightIndex(0);
  };

  const blurInput = () => {
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (onChange) {
      resetHighlightIndex();
      onChange(debounceValue);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (selectedValue) {
      onSelect(selectedValue);
    }
  }, [selectedValue]);

  const handleClickOnItem = (value: ListItem<T>) => () => {
    blurInput();
    setSelectedValue(value);
  };

  const handleOnFocusInput = () => {
    setIsFocused(true);
  };

  const handleOnBlurInput = () => {
    setIsFocused(false);
    setSearchValue("");
    resetHighlightIndex();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const listSize = values?.length || 0;
    if (event.key === ARROW_DOWN_KEY && highlightIndex < listSize - 1) {
      event.preventDefault();
      setHighlightIndex((prevIndex) => ++prevIndex);
    }
    if (event.key === ARROW_UP_KEY && highlightIndex > 0) {
      event.preventDefault();
      setHighlightIndex((prevIndex) => --prevIndex);
    }
    if (event.key === ENTER_KEY) {
      setSelectedValue(values?.[highlightIndex]);
      blurInput();
    }
    if (event.key === ESC_KEY) {
      blurInput();
    }
  };

  return (
    <div className="autocomplete">
      <AutocompleteInput
        value={searchValue}
        placeholder={selectedValue?.label}
        onChange={setSearchValue}
        ref={inputRef}
        onFocus={handleOnFocusInput}
        onBlur={handleOnBlurInput}
        onKeyDown={handleKeyDown}
      />
      {focused && (
        <AutocompleteList>
          {isEmptySearch ? (
            <AutocompleteListItemEmpty />
          ) : notFoundResults ? (
            <AutocompleteListItemNotFound />
          ) : (
            values?.map((value, index) => (
              <AutocompleteListItem
                key={value.label}
                value={value}
                onClick={handleClickOnItem(value)}
                highlight={index === highlightIndex}
              />
            ))
          )}
        </AutocompleteList>
      )}
    </div>
  );
};

export default Autocomplete;
