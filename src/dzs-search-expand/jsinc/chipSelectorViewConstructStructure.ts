import {DzsSearchExpand} from "../dzs-search-expand";
import {insertHtml} from "../js_common/dzs_helpers";
import {DZS_CHIP_SELECTOR_CSS_SELECTOR_OVERFLOW_TOOLTIP_CONTENT} from "../config/dzs-search-expand.config";
import {ChipSelectorItem} from "../dzs-search-expand.type";

export function viewChipSelectorChipItemStructure(item: ChipSelectorItem) {
  return `<li data-value="${item.value}" class="dzs-search-expand--item">
<div class="dzs-search-expand--item--content">${item.htmlContent}</div>
<button class="dzs-search-expand--item--remove" matChipRemove type="button">
  <figure>x</figure>
</button>
</li>`;
}

export function chipSelectorInitStructure(selfInstance: DzsSearchExpand) {


  if (!selfInstance.$elem_.querySelector('.dzs-search-expand--container')) {

    const chipListString = `<div class="dzs-search-expand--chip-list">
              <ul class="dzs-search-expand--chip-list-wrapper">

              </ul>
            </div>`;


    const chipListOverflowPlaceholder = `<div class="dzs-search-expand--overflow-placeholder"><span>...</span>
  <span class="${DZS_CHIP_SELECTOR_CSS_SELECTOR_OVERFLOW_TOOLTIP_CONTENT}">This is the tooltip text</span></div>`;

    const chipListInputNewElement = `<label class="dzs-search-expand--input-new-element--label">
              <input placeholder="${selfInstance.searchExpandOptions.inputPlaceholderText}" class="dzs-search-expand--input-new-element"
                     autocomplete="off"
                     role="combobox" aria-autocomplete="list" aria-expanded="false"
                     aria-haspopup="listbox"
                     aria-owns="mat-autocomplete-1">
            </label>`;


    insertHtml(selfInstance.$elem_, `<div class="dzs-search-expand--container">
          <div class="dzs-search-expand--form-field">
            ${chipListString}
            ${selfInstance.searchExpandOptions.viewIsWrapping ? '' : chipListOverflowPlaceholder}
            ${chipListInputNewElement}
          </div>
        </div>`)

  }

  if (!selfInstance.$elem_.querySelector('.dzs-search-expand--autocompletelist')) {

    insertHtml(selfInstance.$elem_, `<div class="dzs-search-expand--autocompletelist">
          <div class="dzs-search-expand--autocompletelist--inner">
            <div class="dzs-search-expand--autocompletelist--placeholder">No items found</div>
            <ul class="dzs-search-expand--autocompletelist--items">
            </ul>
          </div>
        </div>`)

  }
}