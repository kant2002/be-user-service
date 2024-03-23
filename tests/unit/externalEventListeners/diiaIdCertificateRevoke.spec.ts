import { randomUUID } from 'crypto'

import { BadRequestError } from '@kant2002-diia-inhouse/errors'
import { mockInstance } from '@kant2002-diia-inhouse/test'
import { HttpStatusCode } from '@kant2002-diia-inhouse/types'

import DiiaIdCertificateRevokeEventListener from '@src/externalEventListeners/diiaIdCertificateRevoke'

import DiiaIdService from '@services/diiaId'

import { EventPayload } from '@interfaces/externalEventListeners/diiaIdCertificateRevoke'

describe('DiiaIdCertificateRevokeEventListener', () => {
    const diiaIdServiceMock = mockInstance(DiiaIdService)
    const diiaIdCertificateRevokeEventListener = new DiiaIdCertificateRevokeEventListener(diiaIdServiceMock)

    describe('method: `handler`', () => {
        const uuid = randomUUID()

        it.each([
            [
                'run hard delete identifier by event uuid',
                {
                    uuid,
                    response: {
                        success: true,
                    },
                },
                (): void => {
                    jest.spyOn(diiaIdServiceMock, 'hardDeleteIdentifierByEventUuid').mockResolvedValueOnce()
                },
                (): void => {
                    expect(diiaIdServiceMock.hardDeleteIdentifierByEventUuid).toHaveBeenLastCalledWith(uuid)
                },
            ],
            [
                'run unsuccess revoking',
                {
                    uuid,
                    response: {
                        success: false,
                        error: 'Failed to revoke certificate',
                    },
                },
                (): void => {
                    jest.spyOn(diiaIdServiceMock, 'handleUnsuccessRevoking').mockResolvedValueOnce()
                },
                (): void => {
                    expect(diiaIdServiceMock.handleUnsuccessRevoking).toHaveBeenLastCalledWith(uuid, 'Failed to revoke certificate')
                },
            ],
        ])(
            'should successfully %s',
            async (_msg: string, inputMessage: EventPayload, defineSpies: CallableFunction, checkExpectations: CallableFunction) => {
                defineSpies()

                expect(await diiaIdCertificateRevokeEventListener.handler(inputMessage)).toBeUndefined()

                checkExpectations()
            },
        )

        it('should fail with error', async () => {
            const message = {
                uuid: randomUUID(),
                error: {
                    message: 'Failed to revoke certificate',
                    http_code: HttpStatusCode.BAD_REQUEST,
                },
            }

            await expect(async () => {
                await diiaIdCertificateRevokeEventListener.handler(message)
            }).rejects.toEqual(new BadRequestError('Failed to revoke certificate', { message }))
        })
    })
})
