import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { GetFamilyReq, GetFamilyRes } from '@src/generated'

export interface CustomActionArguments extends UserActionArguments {
    params: GetFamilyReq
}

export type ActionResult = GetFamilyRes
