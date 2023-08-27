// Wait for the page to fully load before manipulating the DOM
// TODO: fix bug: why it shown only after refresh
window.addEventListener('load', () => {
  const headerElement = document.getElementById('partial-discussion-header');

  if (headerElement) {
    const customContent = document.createElement('button');
    customContent.textContent = 'Download Patch';

    customContent.onclick = async () => {
      // TODO: Send Enum instead of string
      await chrome.runtime.sendMessage({ feature: "DownloadPatch" });
    };

    headerElement.appendChild(customContent);
  }
});
