var baseUploader = require('./baseUploader');
var defaultUI = require('./default/defaultUI');
var logoUploader = require('./logo/uploadCore');

module.exports = {
    baseUploader: baseUploader, //无ui版uploader
    uploaderSDK: defaultUI, //默认UI
    logoUploader: logoUploader
}