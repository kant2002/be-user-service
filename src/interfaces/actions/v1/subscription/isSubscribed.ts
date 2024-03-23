import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { PublicServiceCode } from '@interfaces/models/subscription'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        publicService: PublicServiceCode
        subscriptionKey?: string
    }
}

export type ActionResult = boolean
