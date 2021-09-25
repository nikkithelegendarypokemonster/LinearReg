const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types;
const user = new Schema({
    f_amount: {type:Number},
    yield: {type:SchemaTypes.Double}
});
module.exports = mongoose.model('sample', user,'sample');
