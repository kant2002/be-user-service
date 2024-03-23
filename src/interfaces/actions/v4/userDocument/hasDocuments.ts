import { DocumentType, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { DocumentFilter } from '@interfaces/services/userDocument'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        filters: DocumentFilter[][]
    }
}

export type ActionResult = {
    hasDocuments: boolean
    missingDocumnets: DocumentType[]
}
