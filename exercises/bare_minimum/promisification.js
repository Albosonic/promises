/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = function(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  }).then(function(data) {
    return data;
  }).catch();  
}; // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = function() {
  return new Promise(function(resolve, reject) {
    crypto.randomBytes(20, function(err, buffer) {
      if (err) { return reject(err); }
      resolve(buffer.toString('hex'));
    });
  });
}; // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, file) {
      if (err) { return reject(err); }
     
      var funnyFile = file.split('\n')
        .map(function(line) {
          return line + ' lol';
        })
        .join('\n');

      resolve(funnyFile);
    });
  }).then(function(data) {
    return data;
  }).catch();
}; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
