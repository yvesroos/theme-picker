import { MouseEventHandler, useEffect, useRef } from "react";
import { ListItem } from "./types";

interface Props<T> {
  value: ListItem<T>;
  onClick: MouseEventHandler<HTMLLIElement>;
  highlight: boolean;
}

const AutocompleteListItem = <T,>({ value, onClick, highlight }: Props<T>) => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (highlight) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [highlight]);

  return (
    <li
      ref={ref}
      aria-selected={highlight}
      tabIndex={0}
      className={`autocomplete__listitem ${
        highlight ? "autocomplete__listitem--highlight" : ""
      }`}
      onMouseDown={onClick}
    >
      {value.label}
    </li>
  );
};

export default AutocompleteListItem;
