import { GrpcAppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import { ActRecordRequestType } from '@src/generated'

import MyInfoService from '@services/myInfo'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/myInfo/unhideActRecords'

export default class UnhideActRecordsAction implements GrpcAppAction {
    constructor(private readonly myInfoService: MyInfoService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'unhideActRecords'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        recordType: { type: 'string', enum: Object.values(ActRecordRequestType) },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params,
            session: { user },
        } = args

        return await this.myInfoService.unhideActRecord(user, params)
    }
}
