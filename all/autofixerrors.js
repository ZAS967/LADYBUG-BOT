// Import required modules
const process = require('process');
const loggingService = require('./logging-service'); // Assuming a logging service module

/**
 * Error handling function.
 * @param {Error} err - The error that occurred.
 */
module.exports = (err) => {
  // Log the error to the console
  console.error('Error occurred:', err);

  // Send the error to a logging service
  loggingService.logError(err)
    .then(() => {
      console.log('Error logged successfully');
    })
    .catch((loggingErr) => {
      console.error('Failed to log error:', loggingErr);
    });

  // Restart the process if necessary
  if (process.env.RESTART_ON_ERROR === 'true') {
    console.log('Restarting process...');
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};
