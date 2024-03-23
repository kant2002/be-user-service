import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentType } from '@kant2002-diia-inhouse/types'

import HasDocumentsAction from '@actions/v2/userDocument/hasDocuments'

import UserDocumentService from '@services/userDocument'

describe(`Action ${HasDocumentsAction.name}`, () => {
    const testKit = new TestKit()
    const userDocumentService = mockInstance(UserDocumentService)

    const action = new HasDocumentsAction(userDocumentService)

    describe('Method `handler`', () => {
        it('should return true if user has documents', async () => {
            const args = {
                params: {
                    userIdentifier: 'userIdentifier',
                    documentTypes: [[DocumentType.InternalPassport, DocumentType.DriverLicense], [DocumentType.DriverLicense]],
                },
                session: testKit.session.getUserSession(),
                headers: testKit.session.getHeaders(),
            }

            jest.spyOn(userDocumentService, 'hasDocuments').mockResolvedValueOnce(true)

            expect(await action.handler(args)).toBeTruthy()

            expect(userDocumentService.hasDocuments).toHaveBeenCalledWith(args.params.userIdentifier, args.params.documentTypes)
        })
    })
})
