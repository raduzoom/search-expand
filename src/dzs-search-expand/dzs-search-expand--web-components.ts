// Create a class for the element
import {ChipSelectorItem} from "./dzs-search-expand.type";
import {DzsChipSelector} from "./dzs-search-expand";
import {DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL} from "./dzs-search-expand.config";
import {appendStyle, getChipSelectorOptions} from "./jsinc/web-component/web-component-view";

// Import all available skins
import defaultSkin from "./style/skins/skin-default.scss";
import flatSkin from "./style/skins/skin-flat.scss";
import defaultDarkSkin from "./style/skins/skin-default--theme-dark.scss";
import flatDarkSkin from "./style/skins/skin-flat--theme-dark.scss";

// Skin registry
const SKIN_REGISTRY: Record<string, string> = {
  'default': defaultSkin,
  'flat': flatSkin,
  'default-dark': defaultDarkSkin,
  'flat-dark': flatDarkSkin,
};

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
  currentSkin: string = 'default';

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

    // Get skin from attribute
    this.currentSkin = this.getAttribute('data-skin') || 'default';
    
    appendStyle(this);
  }

  // Method to change skin dynamically
  setSkin(skinName: string) {
    if (SKIN_REGISTRY[skinName]) {
      this.currentSkin = skinName;
      this.updateStyles();
      this.renderComponent();
    } else {
      console.warn(`Skin "${skinName}" not found. Available skins:`, Object.keys(SKIN_REGISTRY));
    }
  }

  // Method to get current skin
  getSkin(): string {
    return this.currentSkin;
  }

  // Method to get available skins
  static getAvailableSkins(): string[] {
    return Object.keys(SKIN_REGISTRY);
  }

  private updateStyles() {
    // Remove existing skin styles
    const existingSkinStyles = this.shadow.querySelectorAll('style[data-skin]');
    existingSkinStyles.forEach(style => style.remove());

    // Add new skin styles
    if (SKIN_REGISTRY[this.currentSkin]) {
      const skinStyle = document.createElement('style');
      skinStyle.setAttribute('data-skin', this.currentSkin);
      skinStyle.textContent = SKIN_REGISTRY[this.currentSkin];
      this.shadow.appendChild(skinStyle);
    }
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
      
      // Override skin with current skin
      chipSelectorOptions.viewSkin = this.currentSkin;

      chipSelectorOptions.onUpdateFunction = (allOptions: ChipSelectorItem[]) => {
        const selectedOptions = allOptions.filter((el: ChipSelectorItem) => el.currentStatus === 'checked');
        console.log(selectedOptions)
      };

      new DzsChipSelector(this.wrapper.querySelector(`.${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}`) as HTMLElement, chipSelectorOptions);
    }
  }

  /**
   * called on connected
   */
  connectedCallback() {
    this.renderComponent();
  }

  // Observe attribute changes for dynamic skin switching
  static get observedAttributes() {
    return ['data-skin'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-skin' && oldValue !== newValue) {
      this.setSkin(newValue);
    }
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