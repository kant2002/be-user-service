import { EventBusListener, ExternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

export default class DiiaIdCertificateInfoEventListener implements EventBusListener {
    readonly event: ExternalEvent = ExternalEvent.DiiaIdCertificateInfo

    readonly isSync: boolean = true

    readonly validationRules: ValidationSchema = {
        subjDRFOCode: { type: 'string' },
    }
}
