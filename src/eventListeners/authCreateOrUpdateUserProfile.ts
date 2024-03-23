import moment from 'moment'

import { IdentifierService } from '@kant2002-diia-inhouse/crypto'
import { EventBusListener, InternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { Gender, PlatformType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import SubscriptionService from '@services/subscription'
import UserProfileService from '@services/userProfile'

import { EventPayload } from '@interfaces/eventListeners/authCreateOrUpdateUserProfile'

export default class AuthCreateOrUpdateUserProfileEventListener implements EventBusListener {
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly userProfileService: UserProfileService,

        private readonly identifier: IdentifierService,
    ) {}

    readonly event: InternalEvent = InternalEvent.AuthCreateOrUpdateUserProfile

    readonly validationRules: ValidationSchema = {
        itn: { type: 'string' },
        gender: { type: 'string', enum: Object.values(Gender) },
        birthDay: { type: 'string' },
        headers: {
            type: 'object',
            props: {
                mobileUid: { type: 'string' },
                platformType: { type: 'string', enum: Object.values(PlatformType) },
                platformVersion: { type: 'string' },
                appVersion: { type: 'string' },
            },
        },
    }

    async handler(message: EventPayload): Promise<void> {
        const { itn, gender, birthDay, headers } = message

        const userIdentifier: string = this.identifier.createIdentifier(itn)
        const dateOfBirth: Date = new Date(moment(birthDay, 'DD.MM.YYYY').valueOf())

        await Promise.all([
            this.subscriptionService.setPublicServiceSubscriptions(userIdentifier, itn),
            this.userProfileService.createOrUpdateProfile({ identifier: userIdentifier, gender, birthDay: dateOfBirth }, headers, itn),
        ])
    }
}
