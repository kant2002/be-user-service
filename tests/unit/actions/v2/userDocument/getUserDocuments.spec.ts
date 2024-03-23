import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentType, OwnerType } from '@kant2002-diia-inhouse/types'

import GetUserDocumentsAction from '@actions/v2/userDocument/getUserDocuments'

import UserDocumentService from '@services/userDocument'

describe(`Action ${GetUserDocumentsAction.name}`, () => {
    const testKit = new TestKit()
    const userDocumentService = mockInstance(UserDocumentService)

    const action = new GetUserDocumentsAction(userDocumentService)

    describe('Method `handler`', () => {
        it('should return user documents by filters', async () => {
            const args = {
                params: {
                    userIdentifier: 'userIdentifier',
                    filters: [{ documentType: DocumentType.BirthCertificate, docStatus: [1], ownerType: OwnerType.owner, docId: 'docId' }],
                },
                session: testKit.session.getUserSession(),
                headers: testKit.session.getHeaders(),
            }

            const documents = [
                {
                    userIdentifier: 'userIdentifier',
                    documentType: DocumentType.BirthCertificate,
                    documentIdentifier: 'documentIdentifier',
                    ownerType: OwnerType.owner,
                    notifications: {},
                },
            ]

            jest.spyOn(userDocumentService, 'getUserDocumentsByFilters').mockResolvedValueOnce(documents)

            expect(await action.handler(args)).toMatchObject({ documents })

            expect(userDocumentService.getUserDocumentsByFilters).toHaveBeenCalledWith(args.params.userIdentifier, args.params.filters)
        })
    })
})
