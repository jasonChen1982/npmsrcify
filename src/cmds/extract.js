'use strict';

const extract = require('../actions/extract/index');

exports.command = 'extract';
exports.desc = '提取文件到指定目录';
exports.builder = {};
exports.handler = function(argv) {
    extract();
};
