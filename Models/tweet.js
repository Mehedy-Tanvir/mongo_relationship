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
const userSchema = new Schema({
    username: String,
    age: Number
});
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chicken make noises', likes: 12 });
//     tweet2.user = user;
//     // user.save();
//     tweet2.save();
// }
// makeTweets();
const findTweet = async () => {
    const t = await Tweet.find({}).populate('user');
    console.log(t);
}
findTweet();

