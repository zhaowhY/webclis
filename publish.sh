#!/bin/bash

echo "git add ."
git add .

read -r -p "Please input git commit -m description: " COMMIT

echo "git commit -m '$COMMIT'"
git commit -m "$COMMIT" --amend

echo "Start upload to NPM"
echo "npm login"
npm login

read -p "Please input update type, patch, minor or major: "  VERSION
npm version $VERSION

echo "Uploading to NPM..."
npm publish

echo "Start upload to github"
echo "git push"
git push

echo "All done!!!"
