
import {SearchExpandOptions} from "./dzs-search-expand.type";
import {dzsSearchExpandDefaultOptions} from "./config/dzs-search-expand--defaultOptions";
import {searchExpandView_initStructure} from "./jsinc/searchExpandViewConstructStructure";


declare global {
  interface Window {
    dzs_initDzsSearchExpand: ($argChip_: HTMLElement, options?: SearchExpandOptions) => void;
  }

  interface HTMLElement {
    webComponent?: any;
  }
}


export class DzsSearchExpand {
  /** DOM - main element wrapper */
  $elem_!: HTMLElement;


  /** config options */
  searchExpandOptions!: SearchExpandOptions;

  inputForm_currentQueryString = '';


  constructor($elem: HTMLElement, searchExpandOptions: SearchExpandOptions, isInitingClass = true) {

    if (!$elem) {
      return;
    }

    this.searchExpandOptions = Object.assign({...dzsSearchExpandDefaultOptions}, searchExpandOptions);

    this.$elem_ = $elem;
    ($elem as any).selfInstance = this;

    if(isInitingClass){
      this.initClass();
    }
  }

  initClass() {

    this.$elem_.classList.add('se-inited');

    searchExpandView_initStructure(this);
  }

  reinit() {
    const selfInstance = this;
  }


}

function getWindow() {
  return globalThis as any || window as any;
}

export function init_searchExpand($argChip_: HTMLElement, options: SearchExpandOptions = {}) {
  new DzsSearchExpand($argChip_, options);

}

getWindow().dzs_initDzsSearchExpand = init_searchExpand;

