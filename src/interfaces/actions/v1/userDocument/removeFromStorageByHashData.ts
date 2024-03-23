import { DocumentType, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        mobileUid?: string
        documentType: DocumentType
        hashData: string
    }
}

export type ActionResult = void
