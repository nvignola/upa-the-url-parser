const helpers = require('./helpers');

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
  test('empty string', () => {
    const url = '';
    expect(helpers.parseURL(url)).toEqual([]);
  });

  test('url without query string', () => {
    const url = 'www.foo.url/home';
    expect(helpers.parseURL(url)).toEqual([]);
  });

  test('url with query string using "?"', () => {
    const url = 'www.foo.url/home?param1=1&param2=2&param3=3';
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

    expect(helpers.parseURL(url)).toEqual(result);
  });
});

describe('printTable()', () => {
  test('results from url with query string', () => {
    const table = `
      <table id="url-parsed-table" class="pure-table pure-table-striped">
        <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>param1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>param2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>param3</td>
            <td>3</td>
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
  test('element should contain new content', () => {
    const newContent = '<strong>Lorem ipsum</strong>';
    const elem = document.querySelector('#container');
    console.log('>>>>', elem);
    helpers.injectContent(newContent);

    expect(elem.innerHTML).toBe(newContent);
  });
});
