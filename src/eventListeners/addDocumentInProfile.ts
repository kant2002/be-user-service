import { EventBusListener, InternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { DocumentType, PlatformType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import { userProfileDocumentValidationSchema } from '@src/validation'

import AnalyticsService from '@services/analytics'
import UserDocumentService from '@services/userDocument'

import { EventPayload } from '@interfaces/eventListeners/addDocumentInProfile'

export default class AddDocumentInProfileEventListener implements EventBusListener {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly userDocumentService: UserDocumentService,
    ) {}

    readonly event: InternalEvent = InternalEvent.DocumentsAddDocumentInProfile

    readonly validationRules: ValidationSchema<EventPayload> = {
        userIdentifier: { type: 'string' },
        documentType: { type: 'string', enum: Object.values(DocumentType) },
        headers: {
            type: 'object',
            props: {
                mobileUid: { type: 'string' },
                platformType: { type: 'string', enum: Object.values(PlatformType) },
                platformVersion: { type: 'string' },
                appVersion: { type: 'string' },
            },
        },
        ...userProfileDocumentValidationSchema,
    }

    async handler(message: EventPayload): Promise<void> {
        const {
            userIdentifier,
            documentType,
            headers: { mobileUid, platformType, platformVersion, appVersion },
            ...document
        } = message

        const headers = this.analyticsService.getHeaders(mobileUid, platformType, platformVersion, appVersion)

        await this.userDocumentService.addDocument(userIdentifier, documentType, document, mobileUid, headers)
    }
}
