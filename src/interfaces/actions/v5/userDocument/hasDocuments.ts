import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { HasDocumentsRequest, HasDocumentsResponse } from '@src/generated'

export interface CustomActionArguments extends ServiceActionArguments {
    params: HasDocumentsRequest
}

export type ActionResult = HasDocumentsResponse
