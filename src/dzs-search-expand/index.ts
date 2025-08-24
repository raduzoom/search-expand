// Main exports for the Search Expand component
export { DzsSearchExpand } from './dzs-search-expand';
export { DzsChipSelectorWrapper, dzsSearchExpandWebComponent_init } from './dzs-search-expand--web-components';
export type { SearchExpandOptions, ChipSelectorItem } from './dzs-search-expand.type';
export { currentStatusType } from './dzs-search-expand.type';

// Import the classes and types for internal use
import { DzsSearchExpand } from './dzs-search-expand';
import { DzsChipSelectorWrapper, dzsSearchExpandWebComponent_init } from './dzs-search-expand--web-components';
import type { SearchExpandOptions } from './dzs-search-expand.type';
import { currentStatusType } from './dzs-search-expand.type';

// Dynamic skin registry - loads CSS files on-demand
const SKIN_REGISTRY: Record<string, string> = {
  'default': 'skin-default.css',
  'flat': 'skin-flat.css',
  'default-dark': 'skin-default--theme-dark.css',
  'flat-dark': 'skin-flat--theme-dark.css',
};

export type AvailableSkins = keyof typeof SKIN_REGISTRY;

// Cache for loaded skins to avoid duplicate requests
const loadedSkins = new Set<string>();

// Configuration for skin loading
interface SkinLoadingConfig {
  basePath?: string;
  preloadSkins?: AvailableSkins[];
}

let skinConfig: SkinLoadingConfig = {
  basePath: '/src/dzs-search-expand/style/skins/',
  preloadSkins: ['default'] // Preload default skin
};

// Configure skin loading behavior
export function configureSkinLoading(config: SkinLoadingConfig): void {
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

// Utility function to load skin dynamically
export async function loadSkin(skinName: AvailableSkins): Promise<void> {
  if (!SKIN_REGISTRY[skinName]) {
    throw new Error(`Skin "${skinName}" not found. Available skins: ${Object.keys(SKIN_REGISTRY).join(', ')}`);
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
    throw error;
  }
}

// Utility function to preload multiple skins
export async function preloadSkins(skins: AvailableSkins[]): Promise<void> {
  const loadPromises = skins.map(skin => loadSkin(skin));
  await Promise.all(loadPromises);
}

// Utility function to get all available skins
export function getAvailableSkins(): AvailableSkins[] {
  return Object.keys(SKIN_REGISTRY) as AvailableSkins[];
}

// Utility function to check if a skin is loaded
export function isSkinLoaded(skinName: AvailableSkins): boolean {
  return loadedSkins.has(skinName);
}

// Utility function to get loaded skins
export function getLoadedSkins(): AvailableSkins[] {
  return Array.from(loadedSkins) as AvailableSkins[];
}

// Main initialization function for traditional usage
export function initSearchExpand(
  element: HTMLElement, 
  options: SearchExpandOptions = {}
): DzsSearchExpand {
  return new DzsSearchExpand(element, options);
}

// Web component initialization
export function initWebComponents(): void {
  dzsSearchExpandWebComponent_init();
}

// Default export for UMD compatibility
export default {
  DzsSearchExpand,
  DzsChipSelectorWrapper,
  initSearchExpand,
  initWebComponents,
  SKIN_REGISTRY,
  loadSkin,
  preloadSkins,
  configureSkinLoading,
  getAvailableSkins,
  isSkinLoaded,
  getLoadedSkins,
  currentStatusType
};
