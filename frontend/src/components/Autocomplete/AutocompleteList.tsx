import { ReactNode, forwardRef } from "react";

interface Props {
  children: ReactNode;
}

const AutocompleteList = forwardRef<HTMLUListElement, Props>(
  ({ children }, ref) => {
    return (
      <ul ref={ref} className="autocomplete__list" role="listbox">
        {children}
      </ul>
    );
  }
);

export default AutocompleteList;
