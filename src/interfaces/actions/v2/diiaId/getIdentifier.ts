import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { SignAlgo } from '@interfaces/models/diiaId'
import { DiiaIdIdentifierResponse } from '@interfaces/services/diiaId'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        signAlgo: SignAlgo
    }
}

export type ActionResult = DiiaIdIdentifierResponse
