import { Document } from 'mongoose'

import { PlatformType } from '@kant2002-diia-inhouse/types'

export interface UserDevice {
    mobileUid: string
    userIdentifier?: string
    platformType: PlatformType
    platformVersion: string
}

export interface UserDeviceModel extends UserDevice, Document {}
