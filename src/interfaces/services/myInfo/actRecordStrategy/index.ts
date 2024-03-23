import { ListItemMlc, UserTokenData } from '@kant2002-diia-inhouse/types'

import { ActRecordsData, DocumentItem } from '@src/generated'

export interface ActRecordStrategy {
    toActRecordsPreviewItem(documentsResponse: DocumentItem): ListItemMlc[]
    toActRecordsData(documentsResponse: DocumentItem): ActRecordsData
    getActRecords(user: UserTokenData, eTag?: string): Promise<DocumentItem | undefined>
}
