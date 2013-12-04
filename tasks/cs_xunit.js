/*
 * grunt-cs-xunit
 * https://github.com/greengerong/grunt-cs-xunit
 *
 * Copyright (c) 2013 greengerongg
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var util = require('util');

module.exports = function (grunt) {

    var buildCommand = function (options) {
        var dll = this.data.dll,
            xUnit = options.xUnit;

        var cmd = util.format("%s %s", xUnit, dll);
        return cmd;
    };

    grunt.registerMultiTask('cs_xunit', 'grunt build for c# xUnit.net test', function () {
        var options = this.options({
            stdout: true,
            xUnit: "xunit.console.exe"
        });

        var cb = this.async();
        var cmd = buildCommand.bind(this)(options);
        var cp = exec(cmd, {}, function (err, stdout, stderr) {
            if (err || stderr) {
                grunt.fatal(err || stderr);
            }
            cb();
        }.bind(this));

        if (options.stdout || grunt.option('verbose')) {
            cp.stdout.pipe(process.stdout);
        }

        cp.stderr.pipe(process.stderr);
    });
};
