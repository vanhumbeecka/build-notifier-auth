import passport from 'passport'
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2'
import urljoin from 'url-join'
import { BnPrincipal, OAuthService } from '../common/principal'
import { githubClientId, githubClientSecret, host } from '../common/variables'

const githubStrategy = new OAuth2Strategy({
  authorizationURL: "https://github.com/login/oauth/authorize",
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  tokenURL: "https://github.com/login/oauth/access_token",
  callbackURL: urljoin(host, '/auth/github/callback'),
}, (accessToken: string, refreshToken: string, profile: any, cb: VerifyCallback) => {
  return cb(undefined, { accessToken, refreshToken, profile, oauthService: OAuthService.GITHUB } as BnPrincipal)
})

const githubStrategyName = "github-strategy"
githubStrategy.name = githubStrategyName

passport.use(githubStrategy)

export {
  githubStrategy,
  githubStrategyName
}
