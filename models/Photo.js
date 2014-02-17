var mongoose  = require('mongoose');
var path = require('path');

//mongoose file upload
/*var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "public");
var uploads = path.join(uploads_base, 'photos');*/

mongoose.connect('mongodb://localhost/photo_app'); 

var schema = new mongoose.Schema({
    name: String,
    path: String,
    data: Buffer,
    contentType:String
});

/*schema.plugin(filePlugin, {
    name: "photo",
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});*/

module.exports = mongoose.model('Photo', schema);