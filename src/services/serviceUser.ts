import { FilterQuery } from 'mongoose'

import { AccessDeniedError } from '@kant2002-diia-inhouse/errors'

import serviceUserModel from '@models/serviceUser'

import { ServiceUserModel } from '@interfaces/models/serviceUser'

export default class ServiceUserService {
    async getServiceUserByLogin(login: string): Promise<ServiceUserModel> {
        const query: FilterQuery<ServiceUserModel> = { login }
        const serviceUser = await serviceUserModel.findOne(query)
        if (!serviceUser) {
            throw new AccessDeniedError('ServiceUser not found')
        }

        return serviceUser
    }
}
