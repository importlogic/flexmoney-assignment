import mongoose from 'mongoose';

let conn = null;
const conn_uri = process.env.MONGODB_URI;

const connectDatabase = async () => {
    if (conn == null) {
        conn = mongoose.createConnection(conn_uri);

        await conn.asPromise();
    }

    return conn;
};

export default connectDatabase;
