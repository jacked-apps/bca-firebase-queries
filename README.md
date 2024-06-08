# Branching, Merging, Deployment Strategy

## All new development starts in a Branch
  
### Branch Naming:  
Sometimes it is helpful to prefix the branch with what type of work it is accomplishing for instance:

`feat/` specifies a new feature  
`debt/` specifies some technical debt/cleanup  
`hotfix/` or `fix/` specifies a bugfix  

After that, a brief one to two word description. Examples:

`feat/profile`  
`debt/cleanup-ununsed-functions`  
`fix/login-bug`  

## All code makes its way into the Main branch via PR (Squash Merge)

Always commit to your branch and push the branch to Github. Create a PR for the branch, and then merge it through the Github UI.

## Create Release branch for all deployment artifacts

We will name the branch after the version number. Example:  

`release/v1.7.0`

Inside this branch, do `npm run build`, commit and then `npm version major|minor|patch`, then push to remote

## Merge Release branch into main with a Merge Commit

This will result in the build and the upped version number to be merged to main in a single commit

## Push the tag that was created to origin

`git push origin v1.7.0`

# Consuming this library from another app

## Install the latest version

1. Go to your consumer app and update the version in your `package.json` to the latest version
2. `rm package-lock.json`
3. `rm -rf node_modules/`
4. `npm install`

## Check what version is installed

Open the following file: `node_modules/bca-firebase-queries/package.json` and see that the `version` property has the number you expect
