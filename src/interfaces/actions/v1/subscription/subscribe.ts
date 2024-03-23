import { DocumentType, UserActionArguments } from '@kant2002-diia-inhouse/types'

import { SubscriptionType } from '@interfaces/models/subscription'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        subscriptionType: SubscriptionType
        documentType: DocumentType
        documentSubscriptionId: string
    }
}

export interface ActionResult {
    success: boolean
}
