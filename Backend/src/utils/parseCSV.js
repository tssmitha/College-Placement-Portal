const fs = require('fs');
const csv = require('csv-parser');

const parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const usns = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.USN) usns.push(row.USN.trim().toUpperCase());  // Capture USNs
      })
      .on('end', () => resolve(usns))  // Resolve with the array of USNs
      .on('error', reject);  // Reject in case of error
  });
};

module.exports = { parseCsv };
