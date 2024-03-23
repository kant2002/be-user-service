import { DocumentType, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { DecryptedDocuments } from '@interfaces/services/userDocumentStorage'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        mobileUid?: string
        documentTypes?: DocumentType[]
    }
}

export type ActionResult = DecryptedDocuments
