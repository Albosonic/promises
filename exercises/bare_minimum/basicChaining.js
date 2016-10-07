/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
var pluck = require('./promiseConstructor');
var gett = require('./promisification');
var fs = require('fs');
var Promise = require('bluebird');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise(function(resolve, reject) {
    pluck.pluckFirstLineFromFileAsync(readFilePath).then(function(name) {
    });
  }).then(function(name) {
    gett.getGitHubProfileAsync(name).then(function(profile) {
      resolve(profile);
    }).then(function() {
      fs.writeFile(writeFilePath, profile, function(err) {
        if (err) {
          reject(err);
        } 
        console.log('It\'s saved!');
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
