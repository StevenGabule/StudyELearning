import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const CartSchema = new Schema({
	user: { 
		type: objectId,
		ref: 'User',
	},
	courses: [{
		ref: {
			type: objectId,
			ref: 'Course'
		},
		no: {
			type: Number,
			default: 0
		}
	}]
});

export default mongoose.model('Cart', CartSchema, 'carts');