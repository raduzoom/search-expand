/**
 * the default class name
 */
import { SearchExpandOptions} from "../dzs-search-expand.type";


// -- 1 level, 2 level warning shallow copy
export const dzsSearchExpandDefaultOptions: SearchExpandOptions = {
  placeholderNoItemsFound: "No items found",
  inputPlaceholderText: "Filter results...",
  middlewareFilterResults: null,
  viewSkin: 'default',
  viewIsWrapping: true,
};