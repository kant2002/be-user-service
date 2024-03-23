import { ObjectId } from 'bson'

import DiiaLogger from '@kant2002-diia-inhouse/diia-logger'
import { EventBus, InternalEvent, Task } from '@kant2002-diia-inhouse/diia-queue'
import { BadRequestError, ModelNotFoundError } from '@kant2002-diia-inhouse/errors'
import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { PlatformType } from '@kant2002-diia-inhouse/types'

import StartSendingMessageNotificationsAction from '@actions/v1/startSendingMessageNotifications'

import DistributionService from '@services/distribution'
import NotificationService from '@services/notification'

import { ServiceTask } from '@interfaces/tasks'

describe(`Action ${StartSendingMessageNotificationsAction.name}`, () => {
    const testKit = new TestKit()
    const headers = testKit.session.getHeaders()
    const loggerMock = mockInstance(DiiaLogger)
    const distributionServiceMock = mockInstance(DistributionService)
    const notificationServiceMock = mockInstance(NotificationService)
    const taskMock = mockInstance(Task)
    const eventBusMock = mockInstance(EventBus)

    const startSendingMessageNotificationsAction = new StartSendingMessageNotificationsAction(
        distributionServiceMock,
        notificationServiceMock,
        taskMock,
        eventBusMock,
        loggerMock,
    )

    describe('method `handler`', () => {
        const messageId = new ObjectId()
        const distributionId = new ObjectId()
        const args = {
            params: {
                messageId,
                platformTypes: [PlatformType.Android, PlatformType.Huawei],
                useExpirations: false,
            },
            session: testKit.session.getUserSession(),
            headers,
        }

        it('should throw ModelNotFoundError if message do not exist', async () => {
            jest.spyOn(notificationServiceMock, 'isMessageExists').mockResolvedValueOnce(false)

            await expect(startSendingMessageNotificationsAction.handler(args)).rejects.toEqual(new ModelNotFoundError('Message', messageId))

            expect(notificationServiceMock.isMessageExists).toHaveBeenCalledWith(messageId)
        })

        it('should throw BadRequestError if not found available platform type to send notifications', async () => {
            jest.spyOn(notificationServiceMock, 'isMessageExists').mockResolvedValueOnce(true)
            jest.spyOn(distributionServiceMock, 'createOrUpdate').mockResolvedValueOnce([new ObjectId(), []])

            await expect(startSendingMessageNotificationsAction.handler(args)).rejects.toEqual(
                new BadRequestError('No available platform type to send notifications'),
            )

            expect(notificationServiceMock.isMessageExists).toHaveBeenCalledWith(messageId)
            expect(distributionServiceMock.createOrUpdate).toHaveBeenCalledWith(messageId, args.params.platformTypes)
        })

        it('should throw Error if failed to publish task to the queue', async () => {
            jest.spyOn(notificationServiceMock, 'isMessageExists').mockResolvedValueOnce(true)
            jest.spyOn(distributionServiceMock, 'createOrUpdate').mockResolvedValueOnce([
                distributionId,
                [PlatformType.Android, PlatformType.Huawei],
            ])
            jest.spyOn(taskMock, 'publish').mockResolvedValueOnce(false)

            await expect(startSendingMessageNotificationsAction.handler(args)).rejects.toEqual(
                new Error('Failed to publish task to the queue'),
            )

            expect(notificationServiceMock.isMessageExists).toHaveBeenCalledWith(messageId)
            expect(distributionServiceMock.createOrUpdate).toHaveBeenCalledWith(messageId, args.params.platformTypes)
            expect(taskMock.publish).toHaveBeenCalledWith(ServiceTask.CREATE_NOTIFICATIONS_BATCHES, {
                messageId,
                platformTypes: [PlatformType.Android, PlatformType.Huawei],
                useExpirations: args.params.useExpirations,
            })
        })

        it('should fail to publish event', async () => {
            jest.spyOn(notificationServiceMock, 'isMessageExists').mockResolvedValueOnce(true)
            jest.spyOn(distributionServiceMock, 'createOrUpdate').mockResolvedValueOnce([
                distributionId,
                [PlatformType.Android, PlatformType.Huawei],
            ])
            jest.spyOn(taskMock, 'publish').mockResolvedValueOnce(true)
            jest.spyOn(eventBusMock, 'publish').mockResolvedValueOnce(false)

            expect(await startSendingMessageNotificationsAction.handler(args)).toMatchObject({ distributionId })

            expect(notificationServiceMock.isMessageExists).toHaveBeenCalledWith(messageId)
            expect(distributionServiceMock.createOrUpdate).toHaveBeenCalledWith(messageId, args.params.platformTypes)
            expect(taskMock.publish).toHaveBeenCalledWith(ServiceTask.CREATE_NOTIFICATIONS_BATCHES, {
                messageId,
                platformTypes: [PlatformType.Android, PlatformType.Huawei],
                useExpirations: args.params.useExpirations,
            })
            expect(loggerMock.error).toHaveBeenCalledWith(`Failed to publish event [${InternalEvent.UserSendMassAnonymousNotifications}]`)
        })

        it('should successfully publish event', async () => {
            jest.spyOn(notificationServiceMock, 'isMessageExists').mockResolvedValueOnce(true)
            jest.spyOn(distributionServiceMock, 'createOrUpdate').mockResolvedValueOnce([
                distributionId,
                [PlatformType.Android, PlatformType.Huawei],
            ])
            jest.spyOn(taskMock, 'publish').mockResolvedValueOnce(true)
            jest.spyOn(eventBusMock, 'publish').mockResolvedValueOnce(true)

            expect(await startSendingMessageNotificationsAction.handler(args)).toMatchObject({ distributionId })

            expect(notificationServiceMock.isMessageExists).toHaveBeenCalledWith(messageId)
            expect(distributionServiceMock.createOrUpdate).toHaveBeenCalledWith(messageId, args.params.platformTypes)
            expect(taskMock.publish).toHaveBeenCalledWith(ServiceTask.CREATE_NOTIFICATIONS_BATCHES, {
                messageId,
                platformTypes: [PlatformType.Android, PlatformType.Huawei],
                useExpirations: args.params.useExpirations,
            })
            expect(loggerMock.error).toHaveBeenCalledWith(`Failed to publish event [${InternalEvent.UserSendMassAnonymousNotifications}]`)
        })
    })
})
