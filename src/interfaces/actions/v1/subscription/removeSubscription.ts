import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { SubscriptionCode } from '@interfaces/services/subscription'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        code: SubscriptionCode
    }
}

export interface ActionResult {
    success: boolean
}
