import { Request } from "express"
import { BnPrincipal } from "./principal";

export interface BnRequest extends Request {
    user: BnPrincipal
}