import { EventBusListener, ExternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

export default class DiiaIdSignDpsPackageInitEventListener implements EventBusListener {
    readonly event: ExternalEvent = ExternalEvent.DiiaIdSignDpsPackagePrepare

    readonly isSync: boolean = true

    readonly validationRules: ValidationSchema = {
        identifier: { type: 'string' },
        inReportDaoArray: {
            type: 'array',
            empty: false,
            items: {
                type: 'object',
                props: {
                    fname: { type: 'string' },
                    contentBase64: { type: 'string' },
                },
            },
        },
    }
}
