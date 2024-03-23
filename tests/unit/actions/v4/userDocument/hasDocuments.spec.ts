import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentType, OwnerType } from '@kant2002-diia-inhouse/types'

import HasDocumentsAction from '@actions/v4/userDocument/hasDocuments'

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
                    filters: [
                        [
                            { documentType: DocumentType.InternalPassport, ownerType: OwnerType.owner },
                            { documentType: DocumentType.DriverLicense, ownerType: OwnerType.owner },
                        ],
                    ],
                },
                session: testKit.session.getUserSession(),
                headers: testKit.session.getHeaders(),
            }

            const result = {
                hasDocuments: true,
                missingDocuments: [],
            }

            jest.spyOn(userDocumentService, 'hasDocumentsByFilters').mockResolvedValueOnce(result)

            expect(await action.handler(args)).toBeTruthy()

            expect(userDocumentService.hasDocumentsByFilters).toHaveBeenCalledWith(args.params.userIdentifier, args.params.filters)
        })
    })
})
