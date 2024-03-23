import { v4 as uuid } from 'uuid'

import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { IdentifierService } from '@kant2002-diia-inhouse/crypto'
import { CryptoDocServiceClient } from '@kant2002-diia-inhouse/diia-crypto-client'
import { AccessDeniedError } from '@kant2002-diia-inhouse/errors'
import { ActionVersion, Logger, SessionType } from '@kant2002-diia-inhouse/types'
import { utils } from '@kant2002-diia-inhouse/utils'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import UserSigningHistoryService from '@services/userSigningHistory'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/diiaId/verifyHash'
import { ProcessCode } from '@interfaces/services'
import { UserHistoryItemStatus } from '@interfaces/services/userHistory'

export default class ValidateSignedFileHashesAction implements AppAction {
    constructor(
        private readonly userSigningHistoryService: UserSigningHistoryService,

        private readonly identifier: IdentifierService,
        private readonly logger: Logger,
        private readonly cryptoDocServiceClient: CryptoDocServiceClient,
    ) {}

    readonly sessionType: SessionType = SessionType.User

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'verifyHash'

    readonly validationRules: ValidationSchema = {
        files: {
            type: 'array',
            empty: false,
            items: {
                type: 'object',
                props: {
                    name: { type: 'string' },
                    hash: { type: 'string' },
                    signature: { type: 'string' },
                },
            },
        },
        publicService: { type: 'string' },
        applicationId: { type: 'string' },
        documents: { type: 'array', empty: false, items: { type: 'string' } },
        recipient: {
            type: 'object',
            props: {
                name: { type: 'string' },
                address: { type: 'string' },
            },
        },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { files, publicService, applicationId, documents, recipient },
            session: {
                user: { identifier: userIdentifier },
            },
            headers: { mobileUid, platformType, platformVersion },
        } = args
        const sessionId: string = this.identifier.createIdentifier(mobileUid)
        const currentDate: Date = new Date()

        try {
            const tasks = files.map(({ hash, signature }) => this.cryptoDocServiceClient.docVerifyHash({ hash, signature }))
            try {
                await Promise.all(tasks)
            } catch (err) {
                const msg = 'Failed to verify signature'

                this.logger.error(msg, { err })

                throw new AccessDeniedError(msg, {}, ProcessCode.SignedDocumentsIntegrityViolated)
            }

            await this.userSigningHistoryService.upsertItem({
                userIdentifier,
                sessionId,
                resourceId: applicationId,
                status: UserHistoryItemStatus.Done,
                platformType,
                platformVersion,
                documents,
                date: currentDate,
                recipient,
                publicService,
                applicationId,
            })

            return
        } catch (err) {
            await utils.handleError(err, async (e) => {
                if (!e.getData()?.processCode) {
                    return
                }

                await this.userSigningHistoryService.upsertItem({
                    userIdentifier,
                    sessionId,
                    resourceId: uuid(),
                    status: UserHistoryItemStatus.Refuse,
                    platformType,
                    platformVersion,
                    documents,
                    date: currentDate,
                    recipient,
                    publicService,
                    applicationId,
                })
            })

            throw err
        }
    }
}
