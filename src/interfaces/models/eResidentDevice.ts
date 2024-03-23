import { Document } from 'mongoose'

import { PlatformType } from '@kant2002-diia-inhouse/types'

export interface EResidentDevice {
    mobileUid: string
    userIdentifier?: string
    platformType: PlatformType
    platformVersion: string
}

export interface EResidentDeviceModel extends EResidentDevice, Document {}
