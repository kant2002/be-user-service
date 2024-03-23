import { EventBusListener, ExternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

export default class DiiaIdHashFilesIntegrityEventListener implements EventBusListener {
    readonly event: ExternalEvent = ExternalEvent.DiiaIdHashFilesIntegrity

    readonly isSync: boolean = true

    readonly validationRules: ValidationSchema = {
        identifier: { type: 'string' },
        checkResults: {
            type: 'array',
            items: {
                type: 'object',
                props: {
                    name: { type: 'string' },
                    checked: { type: 'boolean' },
                },
            },
        },
    }
}
