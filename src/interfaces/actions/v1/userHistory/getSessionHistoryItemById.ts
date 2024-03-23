import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryItemResponse, UserHistoryCode } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        sessionId: string
        actionCode: UserHistoryCode
        itemId: string
    }
}

export type ActionResult = HistoryItemResponse
