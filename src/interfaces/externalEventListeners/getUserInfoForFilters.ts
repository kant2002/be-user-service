import { Gender } from '@kant2002-diia-inhouse/types'

import { UserDocumentTypesCounts } from '@interfaces/services/userDocument'

export interface EventPayload {
    uuid: string
    request: {
        userIdentifier: string
    }
}

export interface ActionResult {
    age: number
    gender: Gender
    documents: UserDocumentTypesCounts
}
