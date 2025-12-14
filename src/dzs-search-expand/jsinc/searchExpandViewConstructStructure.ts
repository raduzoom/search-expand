import {DzsSearchExpand} from "../dzs-search-expand";
import {insertHtml} from "../js_common/dzs_helpers";
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


  console.log('selfInstance.$elem_ 23-' , selfInstance.$elem_);
  if (!selfInstance.$elem_.querySelector('.search-expand--wrapper')) {

    const placeholder = selfInstance.searchExpandOptions.inputPlaceholderText || 'Search...';
    const newStructure = `<div class="search-expand--wrapper">
<div class="search-expand--wrapper--inner">
            <div class="search-expand--icon"></div>
            <input class="search-expand--input" type="text" placeholder="${placeholder}" />
          </div></div>`

    insertHtml(selfInstance.$elem_, newStructure)

  }

  const $icon = selfInstance.$elem_.querySelector('.search-expand--icon') as HTMLElement | null;
  const $input = selfInstance.$elem_.querySelector('input.search-expand--input') as HTMLInputElement | null;

  if ($input && selfInstance.searchExpandOptions.inputPlaceholderText) {
    $input.setAttribute('placeholder', selfInstance.searchExpandOptions.inputPlaceholderText);
  }

  if ($icon) {
    $icon.addEventListener('click', () => {
      if (typeof selfInstance.searchExpandOptions.onSubmitSearch === 'function' && $input) {
        selfInstance.searchExpandOptions.onSubmitSearch($input.value);
      }
    });
  }

  if ($input) {
    $input.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (typeof selfInstance.searchExpandOptions.onSubmitSearch === 'function') {
          selfInstance.searchExpandOptions.onSubmitSearch($input.value);
        }
      }
    });
  }
}