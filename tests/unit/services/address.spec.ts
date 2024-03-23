import { MoleculerService } from '@kant2002-diia-inhouse/diia-app'

import { mockInstance } from '@kant2002-diia-inhouse/test'
import { ActionVersion } from '@kant2002-diia-inhouse/types'

import AddressService from '@services/address'

describe(`Service ${AddressService.name}`, () => {
    const moleculerServiceMock = mockInstance(MoleculerService)

    const addressService = new AddressService(moleculerServiceMock)

    describe('method: `findCommunityCodeByKoatuu`', () => {
        it('should return code', async () => {
            const koatuu = 'koatuu'
            const code = 'code'

            jest.spyOn(moleculerServiceMock, 'act').mockResolvedValueOnce(code)

            expect(await addressService.findCommunityCodeByKoatuu(koatuu)).toBe(code)
            expect(moleculerServiceMock.act).toHaveBeenCalledWith(
                'Address',
                { name: 'findCommunityCodeByKoatuu', actionVersion: ActionVersion.V1 },
                { params: { koatuu } },
            )
            expect(moleculerServiceMock.act).toHaveBeenCalledTimes(1)
        })
    })
})
