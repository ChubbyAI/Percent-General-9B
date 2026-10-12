# GitHub Pages integration

This is an additive website overlay for the existing repository.
It contains DEMOS.md, DEMOS.zh-CN.md, THIRD_PARTY_NOTICES.md and docs/.
Keep the existing README, benchmark figures and repository files.

1. Review the overlay against the current branch before adding the files.
2. Add a link to DEMOS.md (or DEMOS.zh-CN.md) in the existing README.
3. For an existing repository without another Pages source, use Settings → Pages:
   Deploy from a branch → main → /docs → Save.
4. Wait for the Pages deployment to complete. Get its actual URL from Visit site.
5. Verify that the entry page, all six cases, GIF downloads and license links load.
6. Only then put the confirmed deployed URL into the README and share it externally.

If the repository already has a Pages source or docs content, integrate with
that existing setup rather than overwriting it. Do not replace the current README.
No backend, GPU runtime, account credentials, model weights or API key is needed
to run this static playback website.

GitHub documentation:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
