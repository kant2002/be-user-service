import { ActHeaders, Gender } from '@kant2002-diia-inhouse/types'

export interface EventPayload {
    userIdentifier: string
    gender: Gender
    birthDay: string
    headers: ActHeaders
}
