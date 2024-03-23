import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { UserInfoForFilters } from '@interfaces/services/userProfile'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
    }
}

export type ActionResult = UserInfoForFilters
