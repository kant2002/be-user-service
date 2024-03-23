import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { GetUserDocumentsRequest, GetUserDocumentsResponse } from '@src/generated'

export interface CustomActionArguments extends ServiceActionArguments {
    params: GetUserDocumentsRequest
}

export type ActionResult = GetUserDocumentsResponse
