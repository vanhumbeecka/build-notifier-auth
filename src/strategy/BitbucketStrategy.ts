import passport from 'passport'
import OAuth2Strategy, { VerifyCallback } from "passport-oauth2";
import { bitbucketClientId, bitbucketClientSecret, host } from "../common/variables";
import { Request, Response } from "express"
import { resolve } from 'url'
import { BnPrincipal, OAuthService } from "../common/principal";
import urljoin from "url-join"

const bitbucketStrategy = new OAuth2Strategy({
    authorizationURL: "https://bitbucket.org/site/oauth2/authorize",
    clientID: bitbucketClientId,
    clientSecret: bitbucketClientSecret,
    tokenURL: "https://bitbucket.org/site/oauth2/access_token",
    callbackURL: urljoin(host, '/auth/bitbucket/callback'),
}, (accessToken: string, refreshToken: string, profile: any, cb: VerifyCallback) => {
    return cb(undefined, { accessToken, refreshToken, profile, oauthService: OAuthService.BITBUCKET } as BnPrincipal)
})

const bitbucketStrategyName = "bitbucket-strategy"
bitbucketStrategy.name = bitbucketStrategyName

passport.use(bitbucketStrategy)

export {
    bitbucketStrategy,
    bitbucketStrategyName
}
