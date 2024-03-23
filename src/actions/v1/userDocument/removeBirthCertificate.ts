import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, DocumentType, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserDocumentStorageService from '@services/userDocumentStorage'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/userDocument/removeBirthCertificate'

export default class RemoveBirthCertificateAction implements AppAction {
    constructor(private readonly userDocumentStorageService: UserDocumentStorageService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'removeBirthCertificate'

    readonly validationRules: ValidationSchema = {
        documentType: { type: 'string', enum: [DocumentType.BirthCertificate] },
        documentId: { type: 'string' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { documentType, documentId },
            session: {
                user: { identifier: userIdentifier },
            },
        } = args

        await this.userDocumentStorageService.removeFromStorageById(userIdentifier, documentType, documentId)

        return { success: true }
    }
}
