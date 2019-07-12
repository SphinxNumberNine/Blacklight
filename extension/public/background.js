"use strict";

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.subject) {
      case "link clicked":
        console.log("1");
        chrome.tabs.create({ url: message.url });
    }
  });
});
