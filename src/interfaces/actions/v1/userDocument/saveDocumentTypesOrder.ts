import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { DocumentTypeWithOrder } from '@interfaces/services/userDocumentSettings'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        documentsOrder: DocumentTypeWithOrder[]
    }
}

export interface ActionResult {
    success: boolean
}
