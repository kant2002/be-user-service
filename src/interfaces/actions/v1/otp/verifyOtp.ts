import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        otp: number
    }
}

export interface ActionResult {
    success: boolean
}
