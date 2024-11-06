const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});   
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
    
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({ 
            author: `6704a716533512cfc91a165b`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            price: Math.floor(Math.random() * 20) + 10,
            images: [
                {
                  url: 'https://res.cloudinary.com/ddtrjvsee/image/upload/v1730339543/YelpCamp/wymu9ipheth25sobnh8n.jpg',
                  filename: 'YelpCamp/wymu9ipheth25sobnh8n',
                  
                },
                {
                  url: 'https://res.cloudinary.com/ddtrjvsee/image/upload/v1730339544/YelpCamp/geigncuzeepmnukkkrwv.jpg',
                  filename: 'YelpCamp/geigncuzeepmnukkkrwv',
                 
                }
              ]
        });  
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();});