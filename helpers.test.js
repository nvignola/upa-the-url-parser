import mountDOM from 'jsdom-mount';
import helpers from './helpers';

let TARGET_EL = null;
let DOM = null;
let URL_INFO = null;

beforeAll(() => {
  DOM = mountDOM(`
    <div id="container"></div>
  `);
  TARGET_EL = document.querySelector('#container');
  URL_INFO = helpers.urlInfo('http://www.abc.com#asd=1?foo=3')();
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
      <table id="url-parsed-table" class="pure-table pure-table-striped">
        <thead>
            <tr>
              <th>Parameter</th>
              <th>&nbsp;</th>
              <th>Value</th>
            </tr>
        </thead>
        <tbody>
          <tr data-index="0">
            <td>param1</td>
            <td>
              <button title="Copy" class="pure-button btn-small copy" data-copy="1">&copy;</button>
              <button title="Remove" class="pure-button btn-small remove" data-index="0">-</button>
            </td>
            <td>
              <input refs="params" style="width: 100%" data-key="param1" value="1" type="text">
            </td>
          </tr>
          <tr data-index="1">
            <td>param2</td>
            <td>
              <button title="Copy" class="pure-button btn-small copy" data-copy="2">&copy;</button>
              <button title="Remove" class="pure-button btn-small remove" data-index="1">-</button>
            </td>
            <td>
            <input refs="params" style="width: 100%" data-key="param2" value="2" type="text">
            </td>
            </tr>
          <tr data-index="2">
            <td>param3</td>
            <td>
              <button title="Copy" class="pure-button btn-small copy" data-copy="3">&copy;</button>
              <button title="Remove" class="pure-button btn-small remove" data-index="2">-</button>
            </td>
            <td>
              <input refs="params" style="width: 100%" data-key="param3" value="3" type="text">
            </td>
          </tr>
        </tbody>
      </table>
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
