const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('../../lib/util');
const cwd = process.cwd();
const projectRoot = path.basename(cwd);
const fromPrefix = path.resolve(cwd, 'node_modules');

function copyModules(output, mdn, slim) {
  const toPrefix = path.resolve(cwd, output);
  const moduleRoot = path.join(fromPrefix, mdn);

  let from = path.join(fromPrefix, mdn);
  let to = path.join(toPrefix, mdn);

  if (slim) {
    const package = require(path.join(moduleRoot, 'package.json'));
    const build = path.dirname(package.main);
    from = path.join(from, build);
    to = path.join(to, build);
  }

  const taskTips = chalk.yellow(`from ${path.join(projectRoot, 'node_modules')} to ${path.join(projectRoot, output)}`);

  return fse.copy(from, to)
    .then(() => {
      console.log(chalk.green(`copy ${mdn} success, ${taskTips}`));
    })
    .catch(err => {
      console.log(chalk.red(`copy ${mdn} error, ${taskTips}`));
      console.error(err);
    });
}

module.exports = function(argv) {
  const slim = argv.slim;
  const pkg = util.getPkg();
  const npmsrcifyConfig = pkg.config.npmsrcify;
  const rawModules = npmsrcifyConfig.modules;
  const output = npmsrcifyConfig.output || './library';
  const tasks = rawModules.map(mdn => {
    return copyModules(output, mdn, slim);
  });
  return Promise.all(tasks)
    .then(() => {
      console.log('node modules resourceify success');
    });
};
