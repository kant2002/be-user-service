import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { GetSubscribedSegmentsRequest, GetSubscribedSegmentsResponse } from '@src/generated'

export interface CustomActionArguments extends ServiceActionArguments {
    params: GetSubscribedSegmentsRequest
}

export type ActionResult = GetSubscribedSegmentsResponse
