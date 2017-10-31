function injectContent(content) {
  document.querySelector('#container').innerHTML = content;
}

function getSplitElement(url) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  return SPLIT_IDENTIFIERS.find(identifier => url.includes(identifier));
}

function parseURL(url) {
  const QS_DIVIDER = '&';
  const SPLIT_AT = getSplitElement(url);

  const [pathname, queryString] = url.split(SPLIT_AT);

  let arrKeyValue = [];

  arrKeyValue = queryString ? decodeURI(queryString).split(QS_DIVIDER).map((tuple) => {
    const [key, value] = tuple.split('=');

    return {
      key,
      value,
    };
  }) : [];

  return arrKeyValue;
}

function printTable(arr) {
  const tableContent = arr.reduce((acc, value) => acc.concat(`
    <tr>
    <td>${value.key}</td>
    <td>${value.value}</td>
    </tr>
    `), '');

  const TABLE = `
    <table id="url-parsed-table" class="pure-table pure-table-striped">
      <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  return TABLE;
}

function printEmptyMsg() {
  return '<strong>Url without query string.</strong>';
}

module.exports = {
  injectContent,
  getSplitElement,
  parseURL,
  printEmptyMsg,
  printTable,
};
