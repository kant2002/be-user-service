import { Document } from 'mongoose'

import { Gender } from '@kant2002-diia-inhouse/types'

export enum CitizenshipSource {
    EResidentRegistry = 'eResidentRegistry',
}

export interface EResidentProfileCitizenship {
    country: string
    date: Date
    sourceId?: string
}

export interface EResidentProfile {
    identifier: string
    gender: Gender
    birthDay: Date
    citizenship?: Record<CitizenshipSource, EResidentProfileCitizenship>
}

export interface EResidentProfileModel extends EResidentProfile, Document {}
