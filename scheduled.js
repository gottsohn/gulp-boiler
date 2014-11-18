global._ = require('lodash');
global.t = require('moment');

var worker = require('./worker');
console.log('sending emails to people at', t().utc().hour());
worker.sendEmails(t().utc().hour());
