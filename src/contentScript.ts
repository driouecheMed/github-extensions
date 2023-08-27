import { Feature } from "./features/feature";
import { AddDownloadPatchElement } from "./features/pull-request/patch/patchElement";

chrome.runtime.onMessage.addListener(request => {
  if (request.featureFromBackground === Feature.DOWNLOAD_PR_PATCH) {
    AddDownloadPatchElement();
  }
});
