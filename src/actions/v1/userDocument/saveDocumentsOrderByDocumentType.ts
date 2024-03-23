import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, DocumentType, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserDocumentSettingsService from '@services/userDocumentSettings'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/userDocument/saveDocumentsOrderByDocumentType'

export default class SaveDocumentsOrderByDocumentTypeAction implements AppAction {
    constructor(private readonly userDocumentSettingsService: UserDocumentSettingsService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'saveDocumentsOrderByDocumentType'

    readonly validationRules: ValidationSchema = {
        documentType: { type: 'string', enum: Object.values(DocumentType) },
        documentsOrder: {
            type: 'array',
            items: {
                type: 'object',
                props: {
                    docNumber: { type: 'string' },
                    order: { type: 'number' },
                },
            },
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { documentType, documentsOrder },
            session: {
                user: { identifier },
            },
        } = args

        await this.userDocumentSettingsService.saveDocumentsOrderByDocumentType(
            { userIdentifier: identifier },
            documentType,
            documentsOrder,
        )

        return { success: true }
    }
}
