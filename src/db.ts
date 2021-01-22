const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');
// const db = process.env.mongoURL;
console.log(db);
const connectDb = async () => {
	console.log(db);
	try {
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log('MongodbConnected');
	} catch (error) {
		console.log(error.message);
		//Exit process
		process.exit(1);
	}
};
module.exports = connectDb;
