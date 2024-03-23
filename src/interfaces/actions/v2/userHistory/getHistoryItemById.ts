import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryItemResponse, UserHistoryCode } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        itemId: string
        actionCode: UserHistoryCode
    }
}

export type ActionResult = HistoryItemResponse
