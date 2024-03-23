import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { DocumentTypeCamelCase } from '@kant2002-diia-inhouse/types'

import GetDocumentsTypeOrderAction from '@actions/v1/userDocument/getDocumentsTypeOrder'

import UserDocumentSettingsService from '@services/userDocumentSettings'

describe(`Action ${GetDocumentsTypeOrderAction.name}`, () => {
    const testKit = new TestKit()
    const userDocumentSettingsService = mockInstance(UserDocumentSettingsService)
    const action = new GetDocumentsTypeOrderAction(userDocumentSettingsService)

    it('should call getDocumentsTypeOrder', async () => {
        const { session, headers } = testKit.session.getUserActionArguments()
        const { identifier: userIdentifier } = session.user
        const documentsTypeOrder = [DocumentTypeCamelCase.uId, DocumentTypeCamelCase.idCard, DocumentTypeCamelCase.taxpayerCard]

        jest.spyOn(userDocumentSettingsService, 'getDocumentsTypeOrder').mockResolvedValueOnce(documentsTypeOrder)

        const result = await action.handler({ session, headers })

        expect(userDocumentSettingsService.getDocumentsTypeOrder).toHaveBeenCalledWith({ userIdentifier })
        expect(result).toEqual({ documentsTypeOrder })
    })
})
