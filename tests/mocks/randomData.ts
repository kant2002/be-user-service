import { v4 as uuid } from 'uuid'

import { IdentifierService } from '@kant2002-diia-inhouse/crypto'

export class RandomData {
    constructor(private readonly identifier: IdentifierService) {}

    generateItn(): string {
        return Math.floor(Math.random() * 10000000000).toString()
    }

    generateUserIdentifier(): string {
        const itn: string = this.generateItn()

        return this.identifier.createIdentifier(itn)
    }

    generateDocumentIdentifier(): string {
        return this.identifier.createIdentifier(uuid())
    }

    generateDocumentIdentifiers(amount: number): string[] {
        const documentIdentifiers: string[] = []

        for (let i = 0; i < amount; i++) {
            documentIdentifiers.push(this.generateDocumentIdentifier())
        }

        return documentIdentifiers
    }

    generateDocId(): string {
        return uuid()
    }
}
