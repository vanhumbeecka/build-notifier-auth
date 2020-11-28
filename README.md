# Build Notifier Authentication BE

This repository acts as the back-end for [build-notifier](https://github.com/vanhumbeecka/build-notifier)

It is used in the 'Authorization Code' flow for Bitbucket and Github. The resulting `access_token` is passed directly to the menubar application.

Deployed using [Serverless](https://www.serverless.com/) for AWS Lambda.