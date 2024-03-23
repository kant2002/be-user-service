import { EventBusListener, InternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { DocumentType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import DocumentFeaturePointsService from '@services/documentFeaturePoints'

import { EventPayload } from '@interfaces/eventListeners/removeDocumentPhoto'

export default class RemoveDocumentPhotoEventListener implements EventBusListener {
    constructor(private readonly documentFeaturePointsService: DocumentFeaturePointsService) {}

    readonly event: InternalEvent = InternalEvent.DocumentsRemoveDocumentPhoto

    readonly validationRules: ValidationSchema = {
        userIdentifier: { type: 'string' },
        documentType: { type: 'string', enum: Object.values(DocumentType) },
        documentIdentifier: { type: 'string' },
    }

    async handler(message: EventPayload): Promise<void> {
        const { userIdentifier, documentType, documentIdentifier } = message

        await this.documentFeaturePointsService.removeDocumentFeaturePoints(userIdentifier, documentType, documentIdentifier)
    }
}
