import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { UnhideActRecordsReq, UnhideActRecordsRes } from '@src/generated'

export interface CustomActionArguments extends UserActionArguments {
    params: UnhideActRecordsReq
}

export type ActionResult = UnhideActRecordsRes
