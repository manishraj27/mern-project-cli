# Contributing to MERN Project CLI

First off, thank you for considering contributing to MERN Project CLI! It's people like you that make it such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/manishraj27/mern-project-cli/issues) page to see if someone else in the community has already created a ticket. If not, go ahead and [make one](https://github.com/manishraj27/mern-project-cli/issues/new)!

## Fork & create a branch

If this is something you think you can fix, then [fork MERN Project CLI](https://help.github.com/articles/fork-a-repo) and create a branch with a descriptive name.

A good branch name would be (Example: where issue #12 is the ticket you're working on):

```sh
git checkout -b 12-add-new-template
```

## Get the development environment running

Make sure you're using a recent version of Node.js, preferably version 14.x or higher.

Clone your fork and install the project dependencies:

```sh
git clone https://github.com/your-username/mern-project-cli.git
cd mern-project-cli
npm install
```

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Make sure your changes work

Before submitting your pull request, make sure that the project still works and that your changes don't introduce any errors. You can test this by running the CLI tool locally:

```sh
node index.js your-project-name
```

## Make a Pull Request

At this point, you should switch back to your main branch and make sure it's up to date with the latest MERN Project CLI main branch:

```sh
git remote add upstream https://github.com/manishraj27/mern-project-cli.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout 12-add-new-template
git rebase main
git push --set-upstream origin 12-add-new-template
```

Finally, go to GitHub and [make a Pull Request](https://help.github.com/articles/creating-a-pull-request) :D

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) [resources](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) but here's the suggested workflow:

```sh
git checkout 12-add-new-template
git pull --rebase upstream main
git push --force-with-lease 12-add-new-template
```

## Code review

The project maintainer will review your pull request and provide feedback. Please be patient as pull requests are often reviewed in spare time. If you don't get a response in a couple of weeks, feel free to ping the thread.

## Merging a PR (maintainers only)

A PR can only be merged into main by a maintainer if:

* It is passing all checks.
* It has been approved by at least one maintainer.
* It has no requested changes.
* It is up to date with current main.

## Shipping a release (maintainers only)

Maintainers need to do the following to push out a release:

* Make sure all pull requests are in
* Update package.json version
* Create a tag for the version; for example `v1.0.3`
* Push the tag to the repository
* Publish to npm: `npm publish`

Thank you for your contributions!