import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        phoneNumber: string
    }
}

export interface ActionResult {
    success: boolean
}
