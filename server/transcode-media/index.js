'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
  region: process.env.ELASTIC_TRANSCODER_REGION
});

exports.handler = function(event, context, callback){
  console.log('Event: ' + JSON.stringify(event));

  var key = event.Records[0].s3.object.key;

  var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

  var outputKey = sourceKey.split('.')[0];

  var params = {
    PipelineId: process.env.ELASTIC_TRANSCODER_PIPELINE_ID,
    OutputKeyPrefix: outputKey + '/',
    Input: {
      Key: sourceKey
    },
    Outputs: [
      {
        Key: outputKey + '-720p' + '.mp4',
        PresetId: '1351620000001-000010'
      },
      {
        Key: outputKey + '-web-720p' + '.mp4',
        PresetId: '1351620000001-100240'
      }
    ]};

  elasticTranscoder.createJob(params, (err, data) => {
    if (err) {
      callback(err);
    }
    console.log('ElasticTranscoder callback data: ' + JSON.stringify(data));
  });
};
