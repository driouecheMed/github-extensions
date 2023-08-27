export function downloadPatch(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl = tabs[0].url;

        // if NO Permission 
        if (currentUrl === undefined) {
            throw new Error('Should not arrive here!');
        }

        const patchUrl = buildPatchUrl(currentUrl);

        chrome.downloads
            .download({
                url: patchUrl,
                headers: [
                    { name: "Accept", value: "application/vnd.github.patch" }
                ],
                filename: buildPatchFileName(currentUrl)
            })
            .catch(console.error);

    });
}

function buildPatchUrl(pullRequestUrl: string): string {
    const prInfo = extractPRInfo(pullRequestUrl);
    return `https://api.github.com/repos/${prInfo.account}/${prInfo.repo}/pulls/${prInfo.pullNumber}`;
}

function buildPatchFileName(pullRequestUrl: string): string {
    const prInfo = extractPRInfo(pullRequestUrl);
    return `${prInfo.repo}_pull_${prInfo.pullNumber}.patch`;
}

function extractPRInfo(pullRequestUrl: string): { account: string; repo: string; pullNumber: string; } {
    // page url: https://github.com/account/repo/pull/1
    const urlParts = pullRequestUrl?.split("/");
    for (let i = 0; i < urlParts.length; i++) {
        if (urlParts[i].toLowerCase().includes('github')) {
            return {
                account: urlParts[i + 1],
                repo: urlParts[i + 2],
                pullNumber: urlParts[i + 4]
            };
        }
    }
    throw new Error('Should not arrive here!');
}

export const exportedForTesting = {
    buildPatchUrl,
    buildPatchFileName,
}
