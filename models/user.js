var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    url: { type: String, required: true },
    short_url: { type: String, required: true, unique: true },
    date: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.create_short_url =function (data, callback) {
    data.save(callback);
}
module.exports.find_short_url =function (short_url, callback) {
    var Query={short_url : short_url};
    User.findOne(Query,callback);
}