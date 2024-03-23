import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { GetUserBirthRecordReq, GetUserBirthRecordRes } from '@src/generated'

export interface CustomActionArguments extends UserActionArguments {
    params: GetUserBirthRecordReq
}

export type ActionResult = GetUserBirthRecordRes
