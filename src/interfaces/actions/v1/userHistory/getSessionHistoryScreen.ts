import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryScreenResponse } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        sessionId: string
    }
}

export type ActionResult = HistoryScreenResponse
