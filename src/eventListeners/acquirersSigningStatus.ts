import { IdentifierService } from '@kant2002-diia-inhouse/crypto'
import { EventBusListener, InternalEvent, QueueMessageMetaData } from '@kant2002-diia-inhouse/diia-queue'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserSigningHistoryService from '@services/userSigningHistory'

import { EventPayload } from '@interfaces/eventListeners/acquirersSigningStatus'
import { SignAlgo } from '@interfaces/models/diiaId'
import { UserHistoryItemStatus } from '@interfaces/services/userHistory'
import { UpsertItemParams } from '@interfaces/services/userSigningHistory'

export default class AcquirersSigningStatusEventListener implements EventBusListener {
    constructor(
        private readonly userSigningHistoryService: UserSigningHistoryService,

        private readonly identifier: IdentifierService,
    ) {}

    readonly event: InternalEvent = InternalEvent.AcquirersSigningStatus

    // TODO(BACK-1845): make required when document-acquirers-service is deployed
    readonly validationRules: ValidationSchema<EventPayload> = {
        userIdentifier: { type: 'string' },
        mobileUid: { type: 'string' },
        platformType: { type: 'string', optional: true },
        platformVersion: { type: 'string', optional: true },
        action: { type: 'string', optional: true },
        resourceId: { type: 'string' },
        status: { type: 'string', enum: Object.values(UserHistoryItemStatus) },
        documents: {
            type: 'array',
            items: { type: 'string' },
        },
        acquirer: {
            type: 'object',
            props: {
                id: { type: 'objectId' },
                name: { type: 'string' },
                address: { type: 'string' },
            },
        },
        offer: {
            type: 'object',
            props: {
                hashId: { type: 'string' },
                name: { type: 'string' },
            },
        },
        signAlgo: { type: 'string', enum: Object.values(SignAlgo), optional: true },
    }

    async handler(message: EventPayload, meta: QueueMessageMetaData): Promise<void> {
        const {
            userIdentifier,
            mobileUid,
            platformType,
            platformVersion,
            action,
            resourceId,
            status,
            documents,
            acquirer,
            offer,
            signAlgo,
        } = message
        const { date } = meta

        const params: UpsertItemParams = {
            userIdentifier,
            sessionId: this.identifier.createIdentifier(mobileUid),
            platformType,
            platformVersion,
            action,
            resourceId,
            status,
            documents,
            date,
            acquirer,
            offer,
        }

        if (signAlgo) {
            params.signAlgo = signAlgo
        }

        await this.userSigningHistoryService.upsertItem(params)
    }
}
