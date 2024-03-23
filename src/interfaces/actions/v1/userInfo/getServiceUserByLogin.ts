import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { ServiceUser } from '@interfaces/models/serviceUser'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        login: string
        hashedPassword: string
    }
}

export type ActionResult = ServiceUser
