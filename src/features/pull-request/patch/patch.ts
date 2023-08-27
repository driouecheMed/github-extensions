export function downloadPatch(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // TODO: Handle undefinded url => NO Permission 
        const currentUrl = tabs[0].url;

        if (currentUrl === undefined) {
            return;
        }

        const prInfo = extractPRInfo(currentUrl);

        // TODO: URL Builder: https://api.github.com/repos/driouecheMed/github-extensions/pulls/1
        const newUrl = "https://api.github.com/repos/" + prInfo.account + "/" + prInfo.repo + "/pulls/" + prInfo.pull;

        chrome.downloads
            .download({
                url: newUrl,
                headers: [
                    { name: "Accept", value: "application/vnd.github.patch" }
                ],
                filename: `${prInfo.repo}_pull_${prInfo.pull}.patch`
            })
            .catch(console.error);

    });
}

function extractPRInfo(url: string) {
    // page url: https://github.com/account/repo/pull/126
    const urlParts = url?.split("/");
    console.log(urlParts);
    // TODO: Improve: something more efficient than split based on "/"
    return {
        account: urlParts[3],
        repo: urlParts[4],
        pull: urlParts[6]
    }
}
