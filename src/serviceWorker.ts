import { downloadPatch } from "./features/pull-request/patch/patch";

chrome.runtime.onMessage.addListener(request => {
    if (request.feature === "DownloadPatch") {
        downloadPatch();
    }
});
