import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, DocumentType, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserDocumentService from '@services/userDocument'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/userDocument/processUserDocuments'

export default class ProcessUserDocuments implements AppAction {
    constructor(private readonly userDocumentService: UserDocumentService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'processUserDocuments'

    readonly validationRules: ValidationSchema = {
        userIdentifier: { type: 'string' },
        documentTypes: { type: 'array', items: { type: 'string', enum: Object.values(DocumentType) } },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { userIdentifier, documentTypes },
        } = args

        return await this.userDocumentService.processUserDocuments(userIdentifier, documentTypes)
    }
}
