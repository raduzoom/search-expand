// Main exports for the Search Expand component
export { DzsChipSelector } from './dzs-search-expand';
export { DzsChipSelectorWrapper, dzsSearchExpandWebComponent_init } from './dzs-search-expand--web-components';
export type { ChipSelectorOptions, ChipSelectorItem } from './dzs-search-expand.type';
export { currentStatusType } from './dzs-search-expand.type';

// Import all available skins for dynamic loading
import defaultSkin from "./style/skins/skin-default.scss";
import flatSkin from "./style/skins/skin-flat.scss";
import defaultDarkSkin from "./style/skins/skin-default--theme-dark.scss";
import flatDarkSkin from "./style/skins/skin-flat--theme-dark.scss";

// Import the classes and types for internal use
import { DzsChipSelector } from './dzs-search-expand';
import { DzsChipSelectorWrapper, dzsSearchExpandWebComponent_init } from './dzs-search-expand--web-components';
import type { ChipSelectorOptions } from './dzs-search-expand.type';
import { currentStatusType } from './dzs-search-expand.type';

// Skin registry for dynamic loading
export const SKIN_REGISTRY = {
  'default': defaultSkin,
  'flat': flatSkin,
  'default-dark': defaultDarkSkin,
  'flat-dark': flatDarkSkin,
} as const;

export type AvailableSkins = keyof typeof SKIN_REGISTRY;

// Utility function to load skin dynamically
export function loadSkin(skinName: AvailableSkins): string {
  return SKIN_REGISTRY[skinName] || SKIN_REGISTRY.default;
}

// Utility function to get all available skins
export function getAvailableSkins(): AvailableSkins[] {
  return Object.keys(SKIN_REGISTRY) as AvailableSkins[];
}

// Main initialization function for traditional usage
export function initSearchExpand(
  element: HTMLElement, 
  options: ChipSelectorOptions = {}
): DzsChipSelector {
  return new DzsChipSelector(element, options);
}

// Web component initialization
export function initWebComponents(): void {
  dzsSearchExpandWebComponent_init();
}

// Default export for UMD compatibility
export default {
  DzsChipSelector,
  DzsChipSelectorWrapper,
  initSearchExpand,
  initWebComponents,
  SKIN_REGISTRY,
  loadSkin,
  getAvailableSkins,
  currentStatusType
};
