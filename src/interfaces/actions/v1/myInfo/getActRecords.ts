import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { GetActRecordsReq, GetActRecordsRes } from '@src/generated'

export interface CustomActionArguments extends UserActionArguments {
    params: GetActRecordsReq
}

export type ActionResult = GetActRecordsRes
