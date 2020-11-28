import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { createLogger, LogLevel, stdSerializers } from 'bunyan'

import serverlessHttp = require('serverless-http')
import express from "express"
import { createExpressApp } from "./app";
import { Logging } from './common/logger'

let expressApp: express.Express

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    Logging.instance = createLogger({
        name: "build-notifier-auth",
        serializers: stdSerializers,
        level: process.env.LOG_LEVEL as LogLevel || "info"
    });

    if (!expressApp) {
        expressApp = createExpressApp()
    }

    const appHandler = serverlessHttp(expressApp)
    const result = await appHandler(event, context);

    return result
}
