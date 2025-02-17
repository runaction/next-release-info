# Generate Next Release Tag

- A GitHub Action to automate the process of creating the next release tag version for your repository. Note: this only generates a new release version instead of creating a new release.
- This action will set an output variable named `release_tag` which can then be used to create the next release.
- It uses the previous release tag and increments over it based on year, month and iteration count.
- Template of release tag will be: `<prefix>yyyymmdd.i`, where prefix=v(default), yyyy=year, mm=month, dd=day i=iteration. Set prefix as '' to remove prefix.
- For example, third release in 10 of December 2022 with default pefix will be: `v20221210.3`.
- This action is recommended to be used with `actions/create-release` to create a release.
- Minimum supported nodejs version is v14.

## Inputs

`github_token`: Github Secret `GITHUB_TOKEN` or `Personal Access Token` which must be passed.

`tag_prefix`: Prefix added to the generated release tag. Optional. Defaults to 'v'. Pass '' to remove prefix in the generated output.

## Outputs

Sets an output variable named `release_tag` which contains the next release version. This can be accessed via `step.<id>.outputs.release_tag`.

## Example workflow

```yaml
name: Create Release

on:
  push:
    branches:
      - release

jobs:
  create_release:
    name: Create a Release
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout branch
        uses: actions/checkout@v2

      - name: Generate release tag
        id: next_release_info
        uses: runaction/next-release-info@v1.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          tag_prefix: 'v'
          tag_format: 'YYYY-MM-DD'

      - name: Create Release
        uses: runaction/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.next_release_info.outputs.release_tag }}
          release_name: Release ${{ steps.next_release_info.outputs.release_tag }}
          generateReleaseNotes: true
```
