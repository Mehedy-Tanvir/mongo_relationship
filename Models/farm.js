const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo', {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Mongoose Database Connected");
});

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Suger Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' }
// ]);
const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farms',
        city: 'Guinda, CA'
    });
    // const melon = await Product.findOne({ name: 'Goddess Melon' });
    // farm.products.push(melon);
    // await farm.save();
    // console.log(farm);

};
// makeFarm();

// const addProduct = async () => {
//     const farm = await Farm.findOne({ name: 'Full Belly Farms' });
//     const asparagus = await Product.findOne({ name: 'Asparagus' });
//     farm.products.push(asparagus);
// await farm.save();
// console.log(farm);
// }
// addProduct();
Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm));



