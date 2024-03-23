import { randomUUID } from 'crypto'

import { Gender } from '@kant2002-diia-inhouse/types'

import { UserProfile } from '@interfaces/models/userProfile'

export function getUserProfile(data: Partial<UserProfile> = {}): UserProfile {
    return {
        identifier: randomUUID(),
        gender: Gender.female,
        birthDay: new Date('2000-01-01'),
        ...data,
    }
}
