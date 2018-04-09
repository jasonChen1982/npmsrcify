const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('../../lib/util');
const cwd = process.cwd();
const projectRoot = path.basename(cwd);
const fromPrefix = path.resolve(cwd, 'node_modules');

function copyModules(output, mdl) {
  const toPrefix = path.resolve(cwd, output);
  const from = path.join(fromPrefix, mdl);
  const to = path.join(toPrefix, mdl);
  const taskTips = chalk.yellow(`from ${path.join(projectRoot, 'node_modules')} to ${path.join(projectRoot, output)}`);
  return fse.copy(from, to)
    .then(() => {
      console.log(chalk.green(`copy ${mdl} success, ${taskTips}`));
    })
    .catch(err => {
      console.log(chalk.red(`copy ${mdl} error, ${taskTips}`));
      console.error(err);
    });
}

module.exports = function() {
  const pkg = util.getPkg();
  const npmsrcifyConfig = pkg.config.npmsrcify;
  const rawModules = npmsrcifyConfig.modules;
  const output = npmsrcifyConfig.output || './library';
  const tasks = rawModules.map(mdl => {
    return copyModules(output, mdl);
  });
  return Promise.all(tasks)
    .then(() => {
      console.log('node modules resourceify success');
    });
};
