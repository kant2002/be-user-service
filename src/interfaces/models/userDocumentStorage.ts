import { Document } from 'mongoose'

import { DocumentType } from '@kant2002-diia-inhouse/types'

export interface UserDocumentStorage {
    userIdentifier: string
    mobileUid?: string
    hashData: string
    documentType: DocumentType
    encryptedData: string
    encryptedPhoto?: string
    encryptedDocPhoto?: string
}

export interface UserDocumentStorageModel extends UserDocumentStorage, Document {}
