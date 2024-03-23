import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { GetUserProfilesRequest, GetUserProfilesResponse } from '@src/generated'

export interface CustomActionArguments extends ServiceActionArguments {
    params: GetUserProfilesRequest
}

export type ActionResult = GetUserProfilesResponse
