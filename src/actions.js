const SparkPost = require('sparkpost')
const spClient = new SparkPost('61a105091ffcdf383f86ab90a393f0c4e1175c23')
const feathers = require('feathers');
const jwttoken = 'diA+ApOJzo4+QgsBVnpt7BiYBqqPX5RasiU9lvmmMfqjdezKJM03Xi8xreceeHTetGKMSji6ajbm09RAFvX6PQ=='
const jwt = require('jsonwebtoken');
 exports.sendTemplateEmail =function(toData,fromData,subject , templateName, globalMergeVars, cb) {

    var cb = cb || function() {};
      var reqOpts = {
      transmissionBody: {
          recipients: [{
              address: {
                  email: toData.email,
                  name: toData.name
              },
              substitution_data: globalMergeVars
          }],
          content: {
              template_id : templateName,

              from: {
                  name: fromData.name,
                  email: fromData.email
              },
              subject: subject,
          }
      }
  };
  spClient.transmissions.send(
      reqOpts,
      function(err, res) {
          if (err) {
            console.log(err);
              return cb(err);
          }
          return cb(null, res);

      });
}
exports.issueToken=function (payload, expirytime) {

     var expiry = (expirytime) ? expirytime : tokenExpiryInMinutes;
    var token = jwt.sign(payload, process.env.TOKEN_SECRET || jwttoken, {
        expiresIn: expiry
    });
    return token;
},

exports.verifyToken=function (token, cb) {
    return jwt.verify(token, process.env.TOKEN_SECRET || jwttoken, {}, cb);
}
