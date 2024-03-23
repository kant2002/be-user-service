import { DocumentType, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

import { VaccinationCertificateType } from '@interfaces/services/userDocumentStorage'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        userIdentifier: string
        mobileUid: string
        documentType: DocumentType
        types: VaccinationCertificateType[]
        birthCertificateId?: string
    }
}

export type ActionResult = void
