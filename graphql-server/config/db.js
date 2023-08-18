const mongoose = require('mongoose');

const connectDB = async () => {
    const connect = await mongoose.connect(`mongodb+srv://403392442:peter94213@cluster0.7zzrttp.mongodb.net/yuanda_db?retryWrites=true&w=majority`);
    console.log(`MongoDB Connected: ${connect.connection.host}`)
}

module.exports = connectDB