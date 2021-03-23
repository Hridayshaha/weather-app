const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();


// app.get('/', (req, res) => {
//     res.send('<h1>Hello I am a node server running on port 4444</h1>');
// })

app.use(cors());

app.use(express.static('public'))


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/history', require('./api/route'));


const PORT = process.env.PORT || 4444;


app.listen(PORT, function () {
    console.log('App Is Running on port ' + PORT);

    mongoose.connect(`mongodb+srv://hriday:hriday01878725658@cluster0.ummew.mongodb.net/weatherAppDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("database Connected")
    })
});