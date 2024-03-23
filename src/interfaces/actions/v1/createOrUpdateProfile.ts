import { Gender, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        identifier: string
        gender: Gender
        birthDay: string
    }
}
