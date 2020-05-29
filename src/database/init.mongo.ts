// imports node modules
import mongoose from 'mongoose';

// mongo uri
const MONGO_URI = 'mongodb://localhost/blog';

export default () => {

    // settings
    mongoose.set('useFindAndModify', false);

    // connecting
    mongoose.connect(process.env.MONGODB_URL || MONGO_URI , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(db => console.log('DB is connected'));
};