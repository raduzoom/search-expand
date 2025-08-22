import {DzsChipSelectorWrapper} from "../../dzs-search-expand--web-components";
import styleChipTextContent from "../../dzs-search-expand.scss";
import {ChipSelectorOptions} from "../../dzs-search-expand.type";


export const appendStyle = (dzsSearchExpandWrapper: DzsChipSelectorWrapper) => {

    // Create some CSS to apply to the shadow dom

    let skinCss = null;
    let skinLink: HTMLElement | null = null;
    let styleChipInner = null;

    dzsSearchExpandWrapper.childNodes.forEach((el) => {
        if ((el as any).tagName === 'STYLE') {
            skinCss = el;
        }
        if ((el as any).tagName === 'LINK') {
            skinLink = el as HTMLElement;
        }
    });

    const styleChip = document.createElement('style');
    styleChip.type = 'text/css';
    styleChip.appendChild(document.createTextNode(styleChipTextContent));


    if (skinCss) {
        styleChipInner = document.createElement('style');
        styleChipInner.type = 'text/css';
        styleChipInner.appendChild(skinCss);
    }


    dzsSearchExpandWrapper.shadow.appendChild(styleChip);
    if (styleChipInner) {
        dzsSearchExpandWrapper.shadow.appendChild(styleChipInner);
    }
    if (skinLink) {
        (skinLink as HTMLElement).setAttribute('href', String((skinLink as HTMLElement).getAttribute('data-lazy-href')));
        dzsSearchExpandWrapper.shadow.appendChild(skinLink);
    }
}


export const getChipSelectorOptions = (dzsSearchExpandWrapper: DzsChipSelectorWrapper): ChipSelectorOptions => {

    let chipSelectorOptions: ChipSelectorOptions = {};


    if (dzsSearchExpandWrapper.getAttribute('data-chip-selector-options')) {
        try {
            const dataChipSelectorOptions = dzsSearchExpandWrapper.getAttribute('data-chip-selector-options');
            chipSelectorOptions = JSON.parse(String(dataChipSelectorOptions));
        } catch (e) {
            console.log('cannot parse', e);
        }
    }
    const dataPersistentOptions = dzsSearchExpandWrapper.getAttribute('data-persistentOptions');
    chipSelectorOptions.persistentOptions = JSON.parse(String(dataPersistentOptions));

    return chipSelectorOptions;
}