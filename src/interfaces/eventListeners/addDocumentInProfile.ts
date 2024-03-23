import { DocumentType, PlatformType } from '@kant2002-diia-inhouse/types'

import { UserProfileDocument } from '@interfaces/services/documents'

export interface EventPayload extends UserProfileDocument {
    userIdentifier: string
    documentType: DocumentType
    headers: {
        mobileUid: string
        platformType: PlatformType
        platformVersion: string
        appVersion: string
    }
}
