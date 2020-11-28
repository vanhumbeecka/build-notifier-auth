import express, {Request, Response, NextFunction} from "express"
import bodyParser from "body-parser";
import passport from "passport";
import { Logging } from './common/logger'
import { bitbucketStrategy } from './strategy/BitbucketStrategy'
import { BnRequest } from "./common/bnRequest";
import helmet from "helmet";
import * as bitbucketService from "./services/BitbucketService"
import * as githubService from "./services/GithubService"
import { githubStrategy } from './strategy/GithubStrategy'

export const createExpressApp = (): express.Express => {
    const app = express();

    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet())
    app.use(passport.initialize())

    app.get('/auth/bitbucket', passport.authenticate(bitbucketStrategy, {
        session: false,
    }));

    app.get('/auth/bitbucket/callback', passport.authenticate(bitbucketStrategy, { 
        session: false
    }), (req: BnRequest, res: Response) => {
        res.json({
            access_token: req.user.accessToken,
            refresh_token: req.user.refreshToken,
            service: req.user.oauthService,
            profile: req.user.profile
        })
    })

    app.post('/auth/bitbucket/refresh', async (req: Request, res: Response) => {
        const {refreshToken} = req.body
        if (!refreshToken) {
            return res.status(400).json({message: "No refreshtoken given"})
        }
        try {
            const tokens = await bitbucketService.refreshAccessToken(refreshToken)
            return res.status(200).json({
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            })
        } catch (e) {
            Logging.instance.error({err: e})
            res.status(500).json({message: "Something went wrong during refresh token"})
        }
    })

    app.get('/auth/github', (req: Request, res: Response, next: NextFunction) => {
        const scopes = ["public_repo"]
        if (req.query.private) {
            scopes.push("repo") // "repo" for private repos
        }
        passport.authenticate(githubStrategy, {
            session: false,
            scope: scopes
        })(req, res, next)
    });

    app.get('/auth/github/callback', passport.authenticate(githubStrategy, {
        session: false
    }), (req: BnRequest, res: Response) => {
        Logging.instance.debug({user: req.user})
        res.json({
            access_token: req.user.accessToken,
            refresh_token: req.user.refreshToken,
            service: req.user.oauthService,
            profile: req.user.profile
        })
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        return res.status(500).json({ message: "Something went wrong" });
    });

    return app
}

