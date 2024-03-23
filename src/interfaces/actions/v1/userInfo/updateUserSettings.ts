import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { UpdateUserSettingsReq } from '@src/generated'

export interface CustomActionArguments extends UserActionArguments {
    params: UpdateUserSettingsReq
}

export type ActionResult = void
