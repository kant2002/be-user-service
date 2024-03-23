import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryResponseByCode, UserHistoryCode } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        action: UserHistoryCode
        session?: string
        skip?: number
        limit?: number
    }
}

export type ActionResult = HistoryResponseByCode
