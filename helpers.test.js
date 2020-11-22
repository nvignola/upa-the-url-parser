/* eslint-disable */
import initHelpers from "~/src/helpers";
import { JSDOM } from "jsdom";

let TARGET_EL = null;
let URL_INFO = null;

let helpers = null;

const containerId = `container`;

beforeAll(() => {
  const {
    window: { document }
  } = new JSDOM(`
  <div id="${containerId}"></div>
  `);

  helpers = initHelpers(document);
  TARGET_EL = document.querySelector(`#${containerId}`);
  URL_INFO = helpers.urlInfo("http://www.abc.com#asd=1?foo=3");
});

describe("getSplitElement()", () => {
  test("empty string", () => {
    const url = "";
    expect(helpers.getSplitElement(url)).toBeUndefined();
  });

  test("url without query string", () => {
    const url = "www.foo.url/home";
    expect(helpers.getSplitElement(url)).toBeUndefined();
  });

  test('url with query string using "?"', () => {
    const url = "www.foo.url/home?param1=1&param2=2&param3=3";
    expect(helpers.getSplitElement(url)).toBe("?");
  });
});

describe("parseUrl()", () => {
  test("url without query string", () => {
    const url = "www.foo.url/home";
    const urlInfo = helpers.urlInfo(url);

    expect(helpers.parseURL(urlInfo.queryString)).toEqual([]);
  });

  test('url with query string using "?"', () => {
    const url = "www.foo.url/home?param1=1&param2=2&param3=3";
    const urlInfo = helpers.urlInfo(url);

    const result = [
      {
        key: "param1",
        value: "1"
      },
      {
        key: "param2",
        value: "2"
      },
      {
        key: "param3",
        value: "3"
      }
    ];

    expect(helpers.parseURL(urlInfo.queryString)).toEqual(result);
  });
});

describe("printTable()", () => {
  test("results from url with query string", () => {
    const table = `
      <tableid="url-parsed-table"class="pure-tablepure-table-striped"><thead><tr><th>Parameter</th><th>Value</th><th>Actions</th></tr></thead><tbody><trdata-index="0"><td><inputclass="input"ref="js-param1"style="width:100%"value="param1"type="text"></td><td><inputclass="input"refs="params"style="width:100%"data-key="param1"value="1"type="number"/></td><tdclass="actions-container"><inputclass="toggle"type="checkbox"data-index="0"checked/><spantitle="Copy[parameter]=[value]tuple"class="copy"data-copy="param1=1">file-stub</span><spantitle="Removeparameter"class="remove"data-index="0">file-stub</span></td></tr><trdata-index="1"><td><inputclass="input"ref="js-param2"style="width:100%"value="param2"type="text"></td><td><inputclass="input"refs="params"style="width:100%"data-key="param2"value="2"type="number"/></td><tdclass="actions-container"><inputclass="toggle"type="checkbox"data-index="1"checked/><spantitle="Copy[parameter]=[value]tuple"class="copy"data-copy="param2=2">file-stub</span><spantitle="Removeparameter"class="remove"data-index="1">file-stub</span></td></tr><trdata-index="2"><td><inputclass="input"ref="js-param3"style="width:100%"value="param3"type="text"></td><td><inputclass="input"refs="params"style="width:100%"data-key="param3"value="3"type="number"/></td><tdclass="actions-container"><inputclass="toggle"type="checkbox"data-index="2"checked/><spantitle="Copy[parameter]=[value]tuple"class="copy"data-copy="param3=3">file-stub</span><spantitle="Removeparameter"class="remove"data-index="2">file-stub</span></td></tr></tbody></table>
    `;

    const rawData = [
      {
        key: "param1",
        value: "1"
      },
      {
        key: "param2",
        value: "2"
      },
      {
        key: "param3",
        value: "3"
      }
    ];

    expect(helpers.printTable(rawData).replace(/\s/gm, "")).toEqual(
      table.replace(/\s/gm, "")
    );
  });
});

describe("printMessage()", () => {
  test("has to return a string", () => {
    expect(helpers.printEmptyMsg()).toBe(
      "<strong>Url without query string.</strong>"
    );
  });
});

describe("injectContent()", () => {
  test("target element should has empty content", () => {
    expect(TARGET_EL.innerHTML.length).toBe(0);
  });

  test("target element should has new content", () => {
    const newContent = '<strong id="new-element">Test</strong>';
    helpers.injectContent(newContent);

    expect(TARGET_EL.innerHTML).toBe(newContent);
  });
});

describe("update url", () => {
  test("when new tuple is provided", () => {
    const newTuples = ["foo=1", "new=1", "bar=2"];
    const newUrl = helpers.getNewRoute(URL_INFO, newTuples);

    expect(newUrl).toEqual("http://www.abc.com#asd=1?foo=1&new=1&bar=2");
  });
});
/* eslint-enable */
