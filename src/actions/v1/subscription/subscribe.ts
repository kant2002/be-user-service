import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, DocumentType, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import SubscriptionService from '@services/subscription'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/subscription/subscribe'
import { SubscriptionType } from '@interfaces/models/subscription'

export default class SubscribeAction implements AppAction {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'subscribe'

    readonly validationRules: ValidationSchema = {
        subscriptionType: { type: 'string', enum: Object.values(SubscriptionType) },
        documentType: { type: 'string', enum: Object.values(DocumentType) },
        documentSubscriptionId: { type: 'string' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            session: {
                user: { identifier: userIdentifier },
            },
            params: { subscriptionType, documentType, documentSubscriptionId },
            headers,
        } = args

        await this.subscriptionService.setDocumentsSubscription({
            userIdentifier,
            subscriptionType,
            documentType,
            documentSubscriptionId,
            isSubscribed: true,
            headers,
        })

        return { success: true }
    }
}
