import { AppUserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryAction, HistoryResponse } from '@interfaces/services/userHistory'

export type CustomActionArguments = AppUserActionArguments & {
    params: {
        action: HistoryAction
        session?: string
        skip?: number
        limit?: number
    }
}

export type ActionResult = HistoryResponse
