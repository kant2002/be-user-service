import Logger from '@kant2002-diia-inhouse/diia-logger'
import { ScheduledTaskEvent } from '@kant2002-diia-inhouse/diia-queue'
import { mockInstance } from '@kant2002-diia-inhouse/test'

import CheckDriverLicensesExpirationsTask from '@src/scheduledTasks/checkDriverLicensesExpirations'

import UserDocumentService from '@services/userDocument'

describe(`Scheduled Task ${CheckDriverLicensesExpirationsTask.name}`, () => {
    const logger = mockInstance(Logger)
    const userDocumentService = mockInstance(UserDocumentService)
    const scheduledTask = new CheckDriverLicensesExpirationsTask(userDocumentService, logger)

    it('should call userDocumentService.checkDriverLicensesExpirations', async () => {
        await scheduledTask.handler()

        expect(scheduledTask.event).toBe(ScheduledTaskEvent.UserCheckDriverLicensesExpirations)
        expect(logger.info).toHaveBeenCalledWith('Start checking driver licenses expirations for notifications')
        expect(userDocumentService.checkDriverLicensesExpirations).toHaveBeenCalled()
    })
})
