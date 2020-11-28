export enum OAuthService {
    BITBUCKET = "bitbucket",
    GITHUB = "github"
}

export interface BnPrincipal {
    accessToken: string;
    refreshToken: string;
    profile?: any;
    oauthService: OAuthService
}
