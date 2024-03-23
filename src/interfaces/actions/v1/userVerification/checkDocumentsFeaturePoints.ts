import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { CheckPointsResult } from '@interfaces/services/documentFeaturePoints'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
    }
}

export interface ActionResult {
    documents: CheckPointsResult[]
}
