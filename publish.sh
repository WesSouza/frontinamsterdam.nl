#!/bin/bash

GIT_USER=`git config user.name`
GIT_EMAIL=`git config user.email`
GIT_REMOTE=`git config remote.origin.url`

rm -rf build || exit 0;

npm install

npm build
cd build

git init
git config user.name "$GIT_USER"
git config user.email "$GIT_EMAIL"

git add .
git commit -m "Deploying to GitHub Pages"

git push --force --quiet "$GIT_REMOTE" master:gh-pages
