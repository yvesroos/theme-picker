import { EMPTY_SEARCH_MESSAGE } from "../../consts";

const AutocompleteListItemEmpty = () => {
  return (
    <li className="autocomplete__listitem autocomplete__listitem--empty">
      {EMPTY_SEARCH_MESSAGE}
    </li>
  );
};

export default AutocompleteListItemEmpty;
