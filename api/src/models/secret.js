import {model,Schema,Types} from "mongoose"

const secretSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
});

const Secret = model('Secret', secretSchema);
export default Secret
