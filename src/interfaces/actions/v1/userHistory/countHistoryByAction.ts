import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { HistoryAction } from '@interfaces/services/userHistory'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        action: HistoryAction
        sessionId?: string
    }
}

export interface ActionResult {
    count: number
}
