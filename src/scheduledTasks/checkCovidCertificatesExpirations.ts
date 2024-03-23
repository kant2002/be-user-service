import { EventBusListener, ScheduledTaskEvent } from '@kant2002-diia-inhouse/diia-queue'
import { Logger } from '@kant2002-diia-inhouse/types'

import UserDocumentService from '@services/userDocument'

export default class CheckCovidCertificatesExpirationsTask implements EventBusListener {
    constructor(
        private readonly userDocumentService: UserDocumentService,
        private readonly logger: Logger,
    ) {}

    readonly event: ScheduledTaskEvent = ScheduledTaskEvent.UserCheckCovidCertificatesExpirations

    async handler(): Promise<void> {
        this.logger.info('Start checking covid certificates expirations for notifications')

        await this.userDocumentService.checkInternationalVaccinationCertificatesExpirations()
    }
}
