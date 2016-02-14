var s3 = require('s3');
var ProgressBar = require('progress');

var client = s3.createClient({
  s3Options: {
    region: 'ap-southeast-2',
  },
});


var params = {
  localDir: 'dist',
  deleteRemoved: true,
  s3Params: {
    Bucket: 'austax.money',
    Prefix: '',
    ACL: 'public-read',
  },
};

var uploader = client.uploadDir(params);
var hasStarted;

uploader.on('error', function(err) {
  console.error('Unable to sync:', err.stack);
});

uploader.on('progress', function() {
  if (!hasStarted) {
    console.log('Uploading...')
    hasStarted = true
  }
});

uploader.on('end', function() {
  console.log('...Done!');
});
