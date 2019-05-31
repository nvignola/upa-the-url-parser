function injectContent(content) {
  document.querySelector('#container').innerHTML = content;
}

function getSplitElement(url) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  return SPLIT_IDENTIFIERS.find(identifier => url.includes(identifier));
}

function parseURL(urlObj = {}) {
  const QS_DIVIDER = '&';
  const TUPLE_DIVIDER = '=';
  const { info: { queryString } } = urlObj;
  const arrKeyValue = queryString ? decodeURI(queryString)
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
        <button title="Copy" class="pure-button btn-small copy" data-copy="${value.value}">&copy;</button>
        <button title="Remove" class="pure-button btn-small remove" data-index="${index}">-</button>
      </td>
      <td>
        <input refs="params" style="width: 100%" data-key="${value.key}" value="${value.value}" type="text">
      </td>
    </tr>
  `), '');

  const TABLE = `
    <table id="url-parsed-table" class="pure-table pure-table-striped">
      <thead>
          <tr>
            <th>Parameter</th>
            <th>&nbsp;</th>
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

const copy = (text) => {
  // Create a textbox field where we can insert text to.
  const copyFrom = document.createElement('textarea');

  // Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  // Append the textbox field into the body as a child.
  // "execCommand()" only works when there exists selected text, and the text is inside
  // document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  // Select all the text!
  copyFrom.select();

  // Execute command
  document.execCommand('copy');

  // (Optional) De-select the text using blur().
  copyFrom.blur();

  // Remove the textbox field from the document.body, so no other JavaScript nor
  // other elements can get access to this.
  document.body.removeChild(copyFrom);
};

function getNewRoute(urlObj, newTuples) {
  return `${urlObj.info.pathname}${urlObj.info.urlDivider}${newTuples.join('&')}`;
}

export default {
  copy,
  injectContent,
  getSplitElement,
  parseURL,
  printEmptyMsg,
  printTable,
  getNewRoute,
  urlInfo,
};
