import { ObjectId } from 'mongodb'

import { PlatformType } from '@kant2002-diia-inhouse/types'

export interface EventPayload {
    messageId: ObjectId
    platformTypes: PlatformType[]
    useExpirations: boolean
}
