import { DocumentDecryptedData } from '@kant2002-diia-inhouse/crypto'
import { DocumentType, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        documentType: DocumentType
        dataToEncrypt: DocumentDecryptedData
        photoToEncrypt?: string
        docPhotoToEncrypt?: string
    }
}

export type ActionResult = void
