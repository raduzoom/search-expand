// Create a class for the element
import {ChipSelectorItem} from "./dzs-search-expand.type";
import {DzsSearchExpand} from "./dzs-search-expand";
import {DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL} from "./dzs-search-expand.config";
import {appendStyle, getChipSelectorOptions} from "./jsinc/web-component/web-component-view";

// Dynamic skin registry - loads CSS files on-demand
const SKIN_REGISTRY: Record<string, string> = {
  'default': 'skin-default.css',
  'flat': 'skin-flat.css',
  'default-dark': 'skin-default--theme-dark.css',
  'flat-dark': 'skin-flat--theme-dark.css',
};

// Cache for loaded skins to avoid duplicate requests
const loadedSkins = new Set<string>();

// Configuration for skin loading
interface SkinLoadingConfig {
  basePath?: string;
  preloadSkins?: string[];
}

let skinConfig: SkinLoadingConfig = {
  basePath: '/src/dzs-search-expand/style/skins/',
  preloadSkins: ['default'] // Preload default skin
};

// Configure skin loading behavior
export function configureWebComponentSkinLoading(config: SkinLoadingConfig): void {
  skinConfig = { ...skinConfig, ...config };

  // Preload specified skins
  if (config.preloadSkins) {
    config.preloadSkins.forEach(skin => {
      if (!loadedSkins.has(skin)) {
        loadSkin(skin);
      }
    });
  }
}

// Function to load skin dynamically
async function loadSkin(skinName: string): Promise<void> {
  if (!SKIN_REGISTRY[skinName]) {
    console.warn(`Skin "${skinName}" not found. Available skins:`, Object.keys(SKIN_REGISTRY));
    return;
  }

  // Check if already loaded
  if (loadedSkins.has(skinName)) {
    return;
  }

  const cssFile = SKIN_REGISTRY[skinName];
  const cssPath = `${skinConfig.basePath}${cssFile}`;

  try {
    // Load CSS file dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssPath;

    // Wait for CSS to load
    await new Promise<void>((resolve, reject) => {
      link.onload = () => {
        loadedSkins.add(skinName);
        resolve();
      };
      link.onerror = () => reject(new Error(`Failed to load skin: ${skinName}`));
      document.head.appendChild(link);
    });
  } catch (error) {
    console.error(`Error loading skin "${skinName}":`, error);
  }
}

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
  async setSkin(skinName: string) {
    if (SKIN_REGISTRY[skinName]) {
      // Load the skin CSS if not already loaded
      await loadSkin(skinName);

      this.currentSkin = skinName;
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

      new DzsSearchExpand(this.wrapper.querySelector(`.${DZS_CHIP_SELECTOR__CLASS_NAME__PRINCIPAL}`) as HTMLElement, chipSelectorOptions);
    }
  }

  /**
   * called on connected
   */
  connectedCallback() {
    // Load the default skin if not already loaded
    loadSkin(this.currentSkin).then(() => {
      this.renderComponent();
    });
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