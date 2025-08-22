// Create a class for the element
import {ChipSelectorItem} from "./dzs-search-expand.type";
import {DzsChipSelector} from "./dzs-search-expand";
import {DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL} from "./dzs-search-expand.config";
import {appendStyle, getChipSelectorOptions} from "./jsinc/web-component/web-component-view";


declare global {
  interface Window {
    dzs_chipSelector_inited: boolean;
  }
}
declare module globalThis {
  let dzs_chipSelector_inited: boolean;
  let dzsSearchExpandWebComponent_init: () => void;
}
globalThis.dzs_chipSelector_inited = false;

export class DzsChipSelectorWrapper extends HTMLElement {
  shadow: ShadowRoot;
  wrapper: HTMLElement;

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.shadow = this.attachShadow({mode: 'open'});

    // Create spans
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', `${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}-wrapper`);

    this.wrapper.innerHTML = `<div class="${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}" >
      </div>`;


    // Attach the created elements to the shadow dom
    this.shadow.appendChild(this.wrapper);

    appendStyle(this);

  }


  disconnectedCallback() {
    console.log(`[DzsChipSelectorWrapper] Removed from DOM`, this);
    // You can also do:
    // - Remove global references
    // - Cleanup observers, intervals, or event listeners
    // - Trigger custom events
  }

  renderComponent() {


    const $chipSelector = this.wrapper.querySelector(`.${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}`);
    ($chipSelector as any).webComponent = this;


    if ($chipSelector) {


      const chipSelectorOptions = getChipSelectorOptions(this);

      chipSelectorOptions.onUpdateFunction = (allOptions: ChipSelectorItem[]) => {
        const selectedOptions = allOptions.filter((el: ChipSelectorItem) => el.currentStatus === 'checked');
        console.log(selectedOptions)
      };
      // chipSelectorOptions.viewSkin = 'alceva';

      // setTimeout(()=>{
      //
      //   import('./style/skins/skin-default.scss').then((ar)=>{
      //   }) ;
      // },1000);

      new DzsChipSelector(this.wrapper.querySelector(`.${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}`) as HTMLElement, chipSelectorOptions);
    }
  }

  /**
   * called on connected
   */
  connectedCallback() {
    this.renderComponent();

  }

}

export function dzsSearchExpandWebComponent_init() {

  if (!globalThis.dzs_chipSelector_inited) {
    customElements.define(DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL, DzsChipSelectorWrapper);
    globalThis.dzs_chipSelector_inited = true;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'dzs-search-expand') {
          console.log('⚠️ Web component removed from DOM:', node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

globalThis.dzsSearchExpandWebComponent_init = dzsSearchExpandWebComponent_init;

/**
 * returns the sum
 */
export function ceva(arg: number): number {

  return arg;
}