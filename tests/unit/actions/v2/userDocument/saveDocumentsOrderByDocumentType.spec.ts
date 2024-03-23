import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentType } from '@kant2002-diia-inhouse/types'

import SaveDocumentsOrderByDocumentTypeAction from '@actions/v2/userDocument/saveDocumentsOrderByDocumentType'

import UserDocumentSettingsService from '@services/userDocumentSettings'

describe(`Action ${SaveDocumentsOrderByDocumentTypeAction.name}`, () => {
    const testKit = new TestKit()
    const userDocumentSettingsService = mockInstance(UserDocumentSettingsService)

    const action = new SaveDocumentsOrderByDocumentTypeAction(userDocumentSettingsService)

    describe('Method `handler`', () => {
        it('should return true after saved user documents order by doc type', async () => {
            const args = {
                params: {
                    documentType: DocumentType.InternalPassport,
                    documentsOrder: [{ docNumber: 'docNumber', order: 1 }],
                },
                session: testKit.session.getUserSession(),
                headers: testKit.session.getHeaders(),
            }

            jest.spyOn(userDocumentSettingsService, 'saveDocumentsOrderByDocumentType').mockResolvedValueOnce()

            expect(await action.handler(args)).toMatchObject({ success: true })

            expect(userDocumentSettingsService.saveDocumentsOrderByDocumentType).toHaveBeenCalledWith(
                {
                    userIdentifier: args.session.user.identifier,
                    features: args.session.features,
                },
                args.params.documentType,
                args.params.documentsOrder,
            )
        })
    })
})
