import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { BadRequestError } from '@kant2002-diia-inhouse/errors'
import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'

import OnboardingService from '@services/onboarding'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/userVerification/getFeatures'

export default class GetFeaturesAction implements AppAction {
    constructor(private readonly onboardingService: OnboardingService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getFeatures'

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            headers: { mobileUid, appVersion, platformType },
        } = args

        if (!mobileUid || !appVersion || !platformType) {
            throw new BadRequestError('Missing mobileUid, appVersion or platformType', { mobileUid, appVersion, platformType })
        }

        return await this.onboardingService.getFeatures(mobileUid, appVersion, platformType)
    }
}
