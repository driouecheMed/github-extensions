import { Feature } from "../../feature";

export function AddDownloadPatchElement(): void {
    const navTabsElement = document.querySelector('.tabnav-tabs');
    if (navTabsElement) {
        const isAlreadyAppened = navTabsElement.querySelector('.download-patch');
        // Prevent from creating element multiple times
        if (!isAlreadyAppened) {
            navTabsElement.appendChild(createDownloadPatchElement());
        }
    }
}

function createDownloadPatchElement(): HTMLAnchorElement {
    const downloadPatchElement = document.createElement('a');
    downloadPatchElement.textContent = 'Download Patch';
    downloadPatchElement.classList.add('download-patch', 'tabnav-tab');     // Add Style Class 
    downloadPatchElement.onclick = async _ => await chrome.runtime.sendMessage({ featureFromContentScript: Feature.DOWNLOAD_PR_PATCH }); ;
    return downloadPatchElement;
}
