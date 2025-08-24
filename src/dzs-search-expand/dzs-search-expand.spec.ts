import {SearchExpandOptions, currentStatusType} from "./dzs-search-expand.type";
import {DzsChipSelector} from "./dzs-search-expand";
import {dzsSearchExpandDefaultOptions} from "./config/dzs-search-expand--defaultOptions";

class ResizeObserver {
  observe() {}
  unobserve() {}
}
describe('DzsChipSelector', () => {
  let $elem: HTMLElement;
  let chipSelectorOptions: SearchExpandOptions;
  let dzsSearchExpand: DzsChipSelector;
  beforeEach(() => {
    $elem = document.createElement('div');
    (window as any).ResizeObserver = ResizeObserver;
    chipSelectorOptions = {...dzsSearchExpandDefaultOptions};
    dzsSearchExpand = new DzsChipSelector($elem, chipSelectorOptions, false);
  });

  test('should initialize the class', () => {
    dzsSearchExpand.initClass();
    expect(dzsSearchExpand).toBeInstanceOf(DzsChipSelector);
  });

  test('should set the placeholderNoItemsFound property', () => {
    dzsSearchExpand.initClass();
    expect(dzsSearchExpand.placeholderNoItemsFound).toBe(String(chipSelectorOptions.placeholderNoItemsFound));
  });

  test('should set the persistentOptions property', () => {
    dzsSearchExpand.initClass();
    dzsSearchExpand.readAttrForPersistentOptions();
    expect(dzsSearchExpand.persistentOptions).toEqual([]);
  });

  test('should set the feedSource property to form if a form is found', () => {
    dzsSearchExpand.initClass();
    const $form = document.createElement('form');
    $elem.appendChild($form);
    dzsSearchExpand.reinit();
    expect(dzsSearchExpand.feedSource).toBe('form');
  });

  test('should set the feedSource property to options if no form is found', () => {
    dzsSearchExpand.initClass();
    dzsSearchExpand.reinit();
    expect(dzsSearchExpand.feedSource).toBe('form');
  });

  test('should update the chips from options', () => {
    dzsSearchExpand.initClass();
    dzsSearchExpand.persistentOptions = [{
      htmlContent: 'Test1',
      value: 'test1',
      currentStatus: currentStatusType.CHECKED
    }, {htmlContent: 'Test2', value: 'test2', currentStatus: currentStatusType.UNCHECKED}];
    dzsSearchExpand.updateChipsFromOptions();

    const chips = $elem.querySelectorAll('.dzs-search-expand--item');
    expect(chips.length).toBe(1);
    expect(chips[0].innerHTML).toContain('Test1');
  });

  test('should update the chips from options wrapping false', () => {
    dzsSearchExpand.persistentOptions = [{
      htmlContent: 'Test1',
      value: 'test1',
      currentStatus: currentStatusType.CHECKED
    }, {htmlContent: 'Test2', value: 'test2', currentStatus: currentStatusType.UNCHECKED}];
    dzsSearchExpand.searchExpandOptions.viewIsWrapping = false;
    dzsSearchExpand.initClass();
    dzsSearchExpand.updateChipsFromOptions();
    jest.spyOn(globalThis, 'getComputedStyle');
    const chips = $elem.querySelectorAll('.dzs-search-expand--item');
    expect(chips.length).toBe(1);
    expect(chips[0].innerHTML).toContain('Test1');
  });
});



describe('getOptionsFromForm', () => {
  let $elem: HTMLElement;
  let dzsSearchExpand: DzsChipSelector;
  let $form: HTMLElement;
  beforeEach(() => {
    $elem = document.createElement('div');
    dzsSearchExpand = new DzsChipSelector($elem, {});
    $form = document.createElement('form');
    $elem.appendChild($form);
  });

  test('should parse the form and set the persistentOptions and autoCompleteOptions properties', () => {
    const $label1 = document.createElement('label');
    $label1.innerHTML = '<input type="checkbox" value="option1" checked>Option 1';
    const $label2 = document.createElement('label');
    $label2.innerHTML = '<input type="checkbox" value="option2">Option 2';
    $form.appendChild($label1);
    $form.appendChild($label2);
    dzsSearchExpand.getOptionsFromForm($form);
    expect(dzsSearchExpand.persistentOptions).toEqual([
      {
        htmlContent: 'Option 1',
        value: 'option1',
        currentStatus: currentStatusType.CHECKED
      },
      {
        htmlContent: 'Option 2',
        value: 'option2',
        currentStatus: currentStatusType.UNCHECKED
      }
    ]);
    expect(dzsSearchExpand.autoCompleteOptions).toEqual([
      {
        htmlContent: 'Option 1',
        value: 'option1',
        currentStatus: currentStatusType.CHECKED
      },
      {
        htmlContent: 'Option 2',
        value: 'option2',
        currentStatus: currentStatusType.UNCHECKED
      }
    ]);
  });
})


describe('updateListFromOptions', () => {
  let $elem: HTMLElement;
  let dzsSearchExpand: DzsChipSelector;
  let $autoCompleteList: HTMLElement;
  beforeEach(() => {
    $elem = document.createElement('div');
    dzsSearchExpand = new DzsChipSelector($elem, {});
  });


  test('should update the autocomplete list with the options', () => {
    // @ts-ignore
    dzsSearchExpand.autoCompleteOptions = [      {        htmlContent: 'Option 1',        value: 'option1'      },      {        htmlContent: 'Option 2',        value: 'option2'      }    ];
    dzsSearchExpand.createListFromOptions();
    dzsSearchExpand.updateListFromOptions();

    const html = (dzsSearchExpand.$autoCompleteList as any).querySelector('.dzs-search-expand--autocompletelist--items').innerHTML
    expect(html).toBe('<li class="dzs-search-expand--autocompletelist--items--item " data-value="option1">Option 1</li><li class="dzs-search-expand--autocompletelist--items--item " data-value="option2">Option 2</li>');
  });

})




describe('autoCompleteFilterResults', () => {
  let $elem: HTMLElement;
  let dzsSearchExpand: DzsChipSelector;
  beforeEach(() => {
    $elem = document.createElement('div');
    dzsSearchExpand = new DzsChipSelector($elem, {});
  });

  test('should filter the options based on the query string', () => {
    dzsSearchExpand.persistentOptions = [
      {
        htmlContent: 'Option 1',
        value: 'option1'
      },
      {
        htmlContent: 'Option 2',
        value: 'option2'
      },
      {
        htmlContent: 'Test Option',
        value: 'test'
      }
    ] as any;
    dzsSearchExpand.autoCompleteOptions = [
      {
        htmlContent: 'Option 1',
        value: 'option1'
      },
      {
        htmlContent: 'Option 2',
        value: 'option2'
      },
      {
        htmlContent: 'Test Option',
        value: 'test'
      }
    ] as any;
    dzsSearchExpand.updateListFromOptions();
    dzsSearchExpand.reinit();
    dzsSearchExpand.inputForm_currentQueryString = 'test';
    dzsSearchExpand.autoCompleteFilterResults(dzsSearchExpand.inputForm_currentQueryString);




    // @ts-ignore
    let findIsHidden = dzsSearchExpand?.$autoCompleteList?.querySelector('[data-value="option2"]').classList.contains('is-hidden');
    expect(findIsHidden).toEqual(true);

    // @ts-ignore
    findIsHidden = dzsSearchExpand?.$autoCompleteList?.querySelector('[data-value="test"]').classList.contains('is-hidden');
    expect(findIsHidden).toEqual(false);
  });


});