const mongoose = require('mongoose');
const DB = "mongodb+srv://rajk1121:Rajat1121@cluster0-chamy.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(conn => {
    // console.log(conn.connection);
    console.log('Connnected to DataBase');
});
const Schema = mongoose.Schema();
const PoemSchema = new mongoose.Schema({
    Author: {
        type: String,
        required: true,
        unique: true
    },
    Poem: {
        type: String,
        required: true
    }
})
const PoemModel = mongoose.model('PoemModel', PoemSchema);
module.exports = PoemModel;