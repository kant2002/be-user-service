import { randomUUID } from 'crypto'

import { mockInstance } from '@kant2002-diia-inhouse/test'
import { Gender } from '@kant2002-diia-inhouse/types'

import GetUserInfoForFiltersListener from '@src/externalEventListeners/getUserInfoForFilters'

import UserProfileService from '@services/userProfile'

import { UserInfoForFilters } from '@interfaces/services/userProfile'

describe('GetUserInfoForFiltersListener', () => {
    const userProfileServiceMock = mockInstance(UserProfileService)
    const getUserInfoForFiltersListener = new GetUserInfoForFiltersListener(userProfileServiceMock)

    describe('method: `handler`', () => {
        it('should successfully fetch and return user filtered info by user identifier', async () => {
            const message = {
                uuid: randomUUID(),
                request: {
                    userIdentifier: 'user-identifier',
                },
            }
            const expectedResult: UserInfoForFilters = {
                age: 30,
                documents: {},
                gender: Gender.female,
                organizationId: randomUUID(),
            }
            const {
                request: { userIdentifier },
            } = message

            jest.spyOn(userProfileServiceMock, 'getUserFilterInfo').mockResolvedValueOnce(expectedResult)

            expect(await getUserInfoForFiltersListener.handler(message)).toEqual(expectedResult)

            expect(userProfileServiceMock.getUserFilterInfo).toHaveBeenCalledWith(userIdentifier)
        })
    })
})
