import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentType } from '@kant2002-diia-inhouse/types'

import HasStorageDocumentAction from '@actions/v1/userDocument/hasStorageDocument'

import UserDocumentStorageService from '@services/userDocumentStorage'

describe(`Action ${HasStorageDocumentAction.name}`, () => {
    const testKit = new TestKit()
    const headers = testKit.session.getHeaders()
    const userDocumentStorageServiceMock = mockInstance(UserDocumentStorageService)

    const hasStorageDocumentAction = new HasStorageDocumentAction(userDocumentStorageServiceMock)

    describe('method `handler`', () => {
        it('should return true if document already exists in storage', async () => {
            const args = {
                params: {
                    userIdentifier: 'userIdentifier',
                    mobileUid: headers.mobileUid,
                    documentType: DocumentType.TaxpayerCard,
                    id: 'id',
                },
                session: testKit.session.getUserSession(),
                headers,
            }

            jest.spyOn(userDocumentStorageServiceMock, 'hasStorageDocument').mockResolvedValueOnce(true)

            expect(await hasStorageDocumentAction.handler(args)).toBeTruthy()

            expect(userDocumentStorageServiceMock.hasStorageDocument).toHaveBeenCalledWith(
                args.params.userIdentifier,
                args.params.mobileUid,
                args.params.documentType,
                args.params.id,
            )
        })
    })
})
