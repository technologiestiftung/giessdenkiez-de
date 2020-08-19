/* eslint-disable */
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');;
const nodeEnv = process.env.NODE_ENV;
const buildTarget = process.env.BUILD_TARGET;
const fp = path.resolve(process.cwd(), "./public/mockServiceWorker.js");




if (!nodeEnv) {
  throw new Error('Please set your NODE_ENV');
}

if (!buildTarget) {
  throw new Error('Please set your BUILD_TARGET (either DEMO or DEFAULT)');
}

function setupMSW() {
  const result = spawn.sync('npx', ['msw', 'init', 'public'], { stdio: 'inherit', cwd: process.cwd() });
}

function rmMSW() {
  rimraf.sync(fp);
}
/**
 * @returns boolean
 */
function mswFileExists() {
  try {
    if (fs.existsSync(fp)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

module.exports = {
  setupMSW: function () {
    if (buildTarget === 'DEMO') {
      console.log('Setting up MSW https://mswjs.io/ for demo purpose.');
    }
    // if node env === prod && buildTarget default rm sw
    // of target === DEMO and not present setup sw
    // if node env dev || test and sw not present call msw setup
    if (nodeEnv === 'production') {
      if (mswFileExists() === false) {
        if (buildTarget === 'DEMO') {
          console.log('MSW setup in NODE_ENV production && BUILD_TARGET DEMO');
          setupMSW();
        }
      } else {
        if ((buildTarget !== 'DEMO')) {
          console.log('MSW rm service-worker in NODE_ENV production && BUILD_TARGET NOT DEMO');
          rmMSW();
        }
      }
    } else if (nodeEnv === 'test' || nodeEnv === 'development') {
      if (buildTarget === 'DEMO') {

        console.log(`Setting up MSW https://mswjs.io/ for demo purpose.in ${process.env.NODE_ENV}`);
        if (mswFileExists() === false) {
          console.log('MSW setup in NODE_ENV test or development');
          setupMSW();
        }
      }
    } else {
      console.info(`No case for NODE_ENV ${process.env.NODE_ENV} with BUILD_TARGET ${process.env.BUILD_TARGET} defined`);
    }
  }
};