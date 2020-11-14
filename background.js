import { urlInfo } from "./helpers";

// fires when tab is updated
chrome.tabs.onUpdated.addListener(updateBadge);

// fires when active tab changes
chrome.tabs.onActivated.addListener(updateBadge);
chrome.tabs.onCreated.addListener(updateBadge);

function updateBadge() {
  // get active tab on current window
  chrome.tabs.query({ active: true, currentWindow: true }, function(
    arrayOfTabs
  ) {
    const tab = arrayOfTabs[0];
    const parsedQueryString = urlInfo(tab.url).parsedQueryString;
    // the return value is an array
    var activeTab = arrayOfTabs[0];

    if (!activeTab) return;
    // compute number for badge for current tab's url
    chrome.browserAction.setBadgeText({
      text: parsedQueryString.length.toString(),
      tabId: activeTab.id
    });
  });
}
