import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { UserHistoryItemStatusRecord } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        sharingIds: string[]
    }
}

export type ActionResult = UserHistoryItemStatusRecord[]
