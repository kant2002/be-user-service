import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { DiiaIdIdentifier } from '@interfaces/services/diiaId'

export type CustomActionArguments = UserActionArguments

export interface ActionResult {
    identifiers: DiiaIdIdentifier[]
}
