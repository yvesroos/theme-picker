import { ChangeEvent, FocusEvent, KeyboardEvent, forwardRef } from "react";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  ({ value = "", onChange, onFocus, onBlur, placeholder, onKeyDown }, ref) => {
    const handleOnChangeSearchValue = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      onChange(event.target.value);
    };

    const triggerSearch = (event: React.MouseEvent<HTMLElement>) => {
      onChange((event.target as HTMLInputElement).value);
    };

    return (
      <input
        tabIndex={0}
        className="autocomplete__input"
        type="text"
        value={value}
        onChange={handleOnChangeSearchValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={triggerSearch}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    );
  }
);

export default AutocompleteInput;
