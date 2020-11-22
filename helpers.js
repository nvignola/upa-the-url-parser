import iconsRender from "./iconsRender";

const parseURL = queryString => {
  const QS_DIVIDER = "&";
  const TUPLE_DIVIDER = "=";

  const arrKeyValue = queryString
    ? decodeURI(queryString)
        .split(QS_DIVIDER)
        .map(tuple => {
          const [key, value] = tuple.split(TUPLE_DIVIDER);

          return {
            key,
            value
          };
        })
    : [];

  return arrKeyValue;
};

const getSplitElement = url => {
  const SPLIT_IDENTIFIERS = ["?", "#"];

  // TODO
  // - Implement custom identifier
  return SPLIT_IDENTIFIERS.find(identifier => url.includes(identifier));
};

function getInputTypeByValue(value) {
  if (!isNaN(value)) {
    return "number";
  }

  return "text";
}

/* eslint-disable implicit-arrow-linebreak */
export const urlInfo = plainUrl => {
  const qs = getSplitElement(plainUrl);
  const [pathname, queryString = ""] = plainUrl.split(qs);
  const parsedQueryString = parseURL(queryString);

  return {
    url: plainUrl,
    pathname,
    queryString,
    urlDivider: qs,
    parsedQueryString
  };
};

export default document => {
  const internalDocument = document;

  const injectContent = content => {
    internalDocument.querySelector("#container").innerHTML = content;
  };

  const printTable = arr => {
    const tableContent = arr
      .filter(value => value.key)
      .reduce(
        (acc, { key, value }, index) =>
          acc.concat(`
      <tr data-index="${index}">
        <td>
          <input class="input" ref="js-${key}" style="width: 100%" value="${key}" type="text">
        </td>
        <td>
        <input class="input" refs="params" style="width: 100%" data-key="${key}" value="${decodeURIComponent(
            value
          )}" type="${getInputTypeByValue(value)}" />
          </td>
        <td class="actions-container">
          <input class="toggle" type="checkbox" data-index="${index}" checked />
          <span title="Copy [parameter]=[value] tuple" class="copy" data-copy="${`${key}=${value}`}">${iconsRender.renderCopyIcon()}</span>
          <span title="Remove parameter" class="remove" data-index="${index}">${iconsRender.renderDeleteIcon()}</span>
        </td>
      </tr>
  `),
        ""
      );

    const TABLE = `
    <table id="url-parsed-table" class="pure-table pure-table-striped">
      <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

    return TABLE;
  };

  const printEmptyMsg = () => "<strong>Url without query string.</strong>";

  const copy = text => {
    // Create a textbox field where we can insert text to.
    const copyFrom = internalDocument.createElement("textarea");

    // Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    // Append the textbox field into the body as a child.
    // "execCommand()" only works when there exists selected text, and the text is inside
    // document.body (meaning the text is part of a valid rendered HTML element).
    internalDocument.body.appendChild(copyFrom);

    // Select all the text!
    copyFrom.select();

    // Execute command
    internalDocument.execCommand("copy");

    // (Optional) De-select the text using blur().
    copyFrom.blur();

    // Remove the textbox field from the document.body, so no other JavaScript nor
    // other elements can get access to this.
    internalDocument.body.removeChild(copyFrom);
  };

  const getNewRoute = (urlObj, newTuples) =>
    `${urlObj.pathname}${urlObj.urlDivider}${newTuples.join("&")}`;

  return {
    copy,
    injectContent,
    getSplitElement,
    parseURL,
    printEmptyMsg,
    printTable,
    getNewRoute,
    urlInfo
  };
};
