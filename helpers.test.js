import mountDOM from 'jsdom-mount';
import helpers from '~/src/helpers';
import { JSDOM } from 'jsdom';

let TARGET_EL = null;
let DOM = null;
let URL_INFO = null;
let document = null;

helpers.injectContent = jest.fn((content) => {
  document.querySelector('#container').innerHTML = content;
});

beforeAll(() => {
  DOM = new JSDOM(`
    <div id="container"></div>
  `);
  TARGET_EL = DOM.window.document.querySelector('#container');
  URL_INFO = helpers.urlInfo('http://www.abc.com#asd=1?foo=3')();
  document = DOM.window.document;
});

describe('getSplitElement()', () => {
  test('empty string', () => {
    const url = '';
    expect(helpers.getSplitElement(url)).toBeUndefined();
  });

  test('url without query string', () => {
    const url = 'www.foo.url/home';
    expect(helpers.getSplitElement(url)).toBeUndefined();
  });

  test('url with query string using "?"', () => {
    const url = 'www.foo.url/home?param1=1&param2=2&param3=3';
    expect(helpers.getSplitElement(url)).toBe('?');
  });
});

describe('parseUrl()', () => {
  test('url without query string', () => {
    const url = 'www.foo.url/home';
    const urlInfo = helpers.urlInfo(url)();
    expect(helpers.parseURL(urlInfo)).toEqual([]);
  });

  test('url with query string using "?"', () => {
    const url = 'www.foo.url/home?param1=1&param2=2&param3=3';
    const urlInfo = helpers.urlInfo(url)();
    const result = [
      {
        key: 'param1',
        value: '1',
      },
      {
        key: 'param2',
        value: '2',
      },
      {
        key: 'param3',
        value: '3',
      },
    ];

    expect(helpers.parseURL(urlInfo)).toEqual(result);
  });
});

describe('printTable()', () => {
  test('results from url with query string', () => {
    const table = `
      <tableid="url-parsed-table"class="pure-tablepure-table-striped"><thead><tr><th>Parameter</th><th>Value</th><th>Actions</th></tr></thead><tbody><trdata-index="0"><td><inputref="js-param1"style="width:100%"value="param1"type="text"></td><td><inputrefs="params"style="width:100%"data-key="param1"value="1"type="text"></td><tdclass="actions-container"><buttontitle="Copy[parameter]=[value]tuple"class="pure-buttoncopybtn-successbtn-action"data-copy=param1=1">file-stub</button><buttontitle="Removeparameter"class="pure-buttonremovebtn-errorbtn-action"data-index="0">file-stub</button></td></tr><trdata-index="1"><td><inputref="js-param2"style="width:100%"value="param2"type="text"></td><td><inputrefs="params"style="width:100%"data-key="param2"value="2"type="text"></td><tdclass="actions-container"><buttontitle="Copy[parameter]=[value]tuple"class="pure-buttoncopybtn-successbtn-action"data-copy=param2=2">file-stub</button><buttontitle="Removeparameter"class="pure-buttonremovebtn-errorbtn-action"data-index="1">file-stub</button></td></tr><trdata-index="2"><td><inputref="js-param3"style="width:100%"value="param3"type="text"></td><td><inputrefs="params"style="width:100%"data-key="param3"value="3"type="text"></td><tdclass="actions-container"><buttontitle="Copy[parameter]=[value]tuple"class="pure-buttoncopybtn-successbtn-action"data-copy=param3=3">file-stub</button><buttontitle="Removeparameter"class="pure-buttonremovebtn-errorbtn-action"data-index="2">file-stub</button></td></tr></tbody></table>
    `;

    const rawData = [
      {
        key: 'param1',
        value: '1',
      },
      {
        key: 'param2',
        value: '2',
      },
      {
        key: 'param3',
        value: '3',
      },
    ];

    expect(helpers.printTable(rawData).replace(/\s/gm, '')).toEqual(table.replace(/\s/gm, ''));
  });
});

describe('printMessage()', () => {
  test('has to return a string', () => {
    expect(helpers.printEmptyMsg()).toBe('<strong>Url without query string.</strong>');
  });
});

describe('injectContent()', () => {
  test('target element should has empty content', () => {
    expect(TARGET_EL.innerHTML.length).toBe(0);
  });

  test('target element should has new content', () => {
    const newContent = '<strong id="new-element">Test</strong>';
    helpers.injectContent(newContent);

    expect(document.querySelector('#container').outerHTML.length).toBe(TARGET_EL.outerHTML.length);
  });
});
