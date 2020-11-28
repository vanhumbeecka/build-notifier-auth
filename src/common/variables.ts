export const nodeEnv = process.env.NODE_ENV || "development"
const isDev = () => nodeEnv === "development"

export const bitbucketClientId = process.env.BITBUCKET_CLIENT_ID
export const bitbucketClientSecret = process.env.BITBUCKET_CLIENT_SECRET
export const bitbucketTokenEndpoint = "https://bitbucket.org/site/oauth2/access_token"
// export const bitbucketScopes = "openid pipelines account"

export const githubClientId = process.env.GITHUB_CLIENT_ID
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET
export const githubTokenEndpoint = "https://github.com/login/oauth/access_token"

export const host = process.env.HOST ||  "http://127.0.0.1:3000/dev"
