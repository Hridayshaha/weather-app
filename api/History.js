const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    icon: String,
    cityName: String,
    countryName: String,
    main: String,
    description: String,
    temp: Number,
    pressure: Number,
    humidity: Number

})

const History = mongoose.model('History', HistorySchema);

module.exports = History;