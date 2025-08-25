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

export function searchExpandView_initStructure(selfInstance: DzsSearchExpand) {


  console.log('selfInstance.$elem_ -' , selfInstance.$elem_);
  if (!selfInstance.$elem_.querySelector('.search-expand--wrapper')) {

    const newStructure = `<div class="search-expand--wrapper">
            <div class="search-expand--icon"></div>
            <input type="text" placeholder="Search..." />
          </div>`

    insertHtml(selfInstance.$elem_, newStructure)

  }

}