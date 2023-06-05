const morgan = require('morgan');

function getLogger() {
    return morgan('common')
}

module.exports = Object.freeze({
    getLogger,
});