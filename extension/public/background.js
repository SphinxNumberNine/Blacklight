"use strict";

chrome.runtime.onInstalled.addListener(() => {
  console.log(0);
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.subject) {
      case "link clicked":
        console.log("1");
        chrome.tabs.create({ url: message.url });
    }
  });
});
