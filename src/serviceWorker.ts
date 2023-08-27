import { Feature } from "./features/feature";
import { downloadPatch } from "./features/pull-request/patch/downloadPatch";
import { pullRequestUrlRegex } from "./shared/regex";

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.id && activeTab.url) {
      await sendMessageToContentScriptIfExists(activeTab.id, activeTab.url);
    }
  });
});

chrome.runtime.onMessage.addListener(request => {
  if (request.featureFromContentScript === Feature.DOWNLOAD_PR_PATCH) {
    downloadPatch();
  }
});

async function sendMessageToContentScriptIfExists(tabId: number, tabUrl: string): Promise<void> {
  if (tabUrl.match(pullRequestUrlRegex)) {
    await chrome.tabs.sendMessage(tabId, { featureFromBackground: Feature.DOWNLOAD_PR_PATCH });
  }
}
