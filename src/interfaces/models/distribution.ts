import { ObjectId } from 'bson'
import { Document } from 'mongoose'

import { PlatformType } from '@kant2002-diia-inhouse/types'

export interface Distribution {
    messageId: ObjectId
    platformTypes: PlatformType[]
}

export interface DistributionModel extends Distribution, Document {}
