import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryResponseByCodeV1, UserHistoryCode } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        action: UserHistoryCode
        skip?: number
        limit?: number
    }
}

export type ActionResult = HistoryResponseByCodeV1
