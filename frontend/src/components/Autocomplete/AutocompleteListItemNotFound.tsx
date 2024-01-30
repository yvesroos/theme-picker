import { NOT_FOUND_MESSAGE } from "../../consts";

const AutocompleteListItemNotFound = () => {
  return (
    <li className="autocomplete__listitem autocomplete__listitem--not-found">
      {NOT_FOUND_MESSAGE}
    </li>
  );
};

export default AutocompleteListItemNotFound;
