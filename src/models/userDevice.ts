import { Model, Schema, model, models } from 'mongoose'

import { PlatformType } from '@kant2002-diia-inhouse/types'

import { UserDevice } from '@interfaces/models/userDevice'

const userDeviceSchema = new Schema<UserDevice>(
    {
        mobileUid: { type: String, unique: true, required: true },
        userIdentifier: { type: String, index: true },
        platformType: { type: String, enum: Object.values(PlatformType), required: true },
        platformVersion: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

export default <Model<UserDevice>>models.UserDevice || model('UserDevice', userDeviceSchema)
