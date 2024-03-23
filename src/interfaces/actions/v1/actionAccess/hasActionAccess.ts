import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { ActionAccessType } from '@interfaces/services/userActionAccess'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        actionAccessType: ActionAccessType
    }
}

export type ActionResult = boolean
