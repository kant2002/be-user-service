import { DocumentType, UserActionArguments } from '@kant2002-diia-inhouse/types'

import { SaveDocumentsOrderByDocumentTypeRequest } from '@interfaces/services/userDocumentSettings'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        documentType: DocumentType
        documentsOrder: SaveDocumentsOrderByDocumentTypeRequest[]
    }
}

export interface ActionResult {
    success: boolean
}
