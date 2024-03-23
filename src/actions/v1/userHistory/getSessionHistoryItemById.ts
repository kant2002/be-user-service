import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserHistoryService from '@services/userHistory'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/userHistory/getSessionHistoryItemById'
import { UserHistoryCode } from '@interfaces/services/userHistory'

export default class GetSessionHistoryItemByIdAction implements AppAction {
    constructor(private readonly userHistoryService: UserHistoryService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getSessionHistoryItemById'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        itemId: { type: 'string' },
        sessionId: { type: 'string' },
        actionCode: { type: 'string', enum: Object.values(UserHistoryCode) },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { itemId, sessionId, actionCode },
            session: {
                user: { identifier: userIdentifier },
            },
        } = args

        return await this.userHistoryService.getSessionHistoryItemById(userIdentifier, itemId, actionCode, sessionId)
    }
}
