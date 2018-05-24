'use strict';

const extract = require('../actions/extract/index');

exports.command = 'extract';
exports.desc = '提取文件到指定目录';
exports.builder = yargs => {
  return yargs
    .option('slim', {
      alias: 's',
      describe: '是否只提取生产文件',
      default: true,
    });
};
exports.handler = function(argv) {
  extract(argv);
};
