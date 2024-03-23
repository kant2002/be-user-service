import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import OtpService from '@services/otp'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/otp/createOtp'

export default class CreateOtpAction implements AppAction {
    constructor(private readonly otpService: OtpService) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'createOtp'

    readonly validationRules: ValidationSchema = {
        phoneNumber: { type: 'phoneNumber' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { phoneNumber },
            session: { user },
            headers,
        } = args

        await this.otpService.createOtp(phoneNumber, user, headers)

        return { success: true }
    }
}
