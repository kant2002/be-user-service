import { DocumentType, PlatformType } from '@kant2002-diia-inhouse/types'

import { UserProfileDocument } from '@interfaces/services/documents'

export interface EventPayload {
    userIdentifier: string
    documentType: DocumentType
    documents: UserProfileDocument[]
    headers: {
        mobileUid?: string
        platformType?: PlatformType
        platformVersion?: string
        appVersion?: string
    }
    removeMissingDocuments?: boolean
}
