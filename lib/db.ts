// import mongoose
import mongoose, {Connection, MongooseOptions} from 'mongoose';

async function dbConnect(): Promise<Connection> {
    // get the connection string from the environment

    if (mongoose.connection.readyState === 0) {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error(`MongoDB connection error: ${mongoURI}`);
        }

        const MongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as MongooseOptions

        await mongoose.connect(mongoURI, MongooseOpts);
    }


    // return the connection object
    return mongoose.connection;
}

export default dbConnect;
