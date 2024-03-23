import { DocumentTypeCamelCase, UserActionArguments } from '@kant2002-diia-inhouse/types'

export type CustomActionArguments = UserActionArguments

export interface ActionResult {
    documentsTypeOrder: DocumentTypeCamelCase[]
}
