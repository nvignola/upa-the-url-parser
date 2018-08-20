function injectContent(content) {
  document.querySelector('#container').innerHTML = content;
}

function getSplitElement(url) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  return SPLIT_IDENTIFIERS.find(identifier => url.includes(identifier));
}

function parseURL(urlObj) {
  const QS_DIVIDER = '&';
  const TUPLE_DIVIDER = '=';
  const arrKeyValue = urlObj.info.queryString ? decodeURI(urlObj.info.queryString)
    .split(QS_DIVIDER)
    .map((tuple) => {
      const [key, value] = tuple.split(TUPLE_DIVIDER);

      return {
        key,
        value,
      };
    }) : [];

  return arrKeyValue;
}

function printTable(arr) {
  const tableContent = arr.reduce((acc, value, index) => acc.concat(`
    <tr data-index="${index}">
      <td>${value.key}</td>
      <td>
        <input refs="params" style="width: 100%" data-key="${value.key}" value="${value.value}" type="textbox">
      </td>
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

function urlInfo(plainUrl) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  const qs = SPLIT_IDENTIFIERS.find(identifier => plainUrl.includes(identifier));
  const [pathname, queryString] = plainUrl.split(qs);

  const info = {
    url: plainUrl,
    pathname,
    queryString,
    urlDivider: qs,
  };

  return () => ({
    info,
  });
}

function getNewRoute(urlObj, newTuples) {
  return `${urlObj.info.pathname}${urlObj.info.urlDivider}${newTuples.join('&')}`;
}

export default {
  injectContent,
  getSplitElement,
  parseURL,
  printEmptyMsg,
  printTable,
  getNewRoute,
  urlInfo,
};
