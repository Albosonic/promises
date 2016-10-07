/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var Promise = require('bluebird');
var fs = require('fs'); 
var pluck = require('../bare_minimum/promiseConstructor');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
 // TODO
  return new Promise(function(resolve, reject) {
    return new Promise.all(filePaths).then(function(files) {
      // loop though
          
      resolve(files);
    });
  }).then(function(files) {
    // console.log('*************', files);
    
    var results = [];
    for (var i = 0; i < files.length; i++) {
      results.push(files[i]);
      pluck.pluckFirstLineFromFileAsync(files[i]).then(function(data) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!', data);
        
      });
    }
  
  });
};





// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
