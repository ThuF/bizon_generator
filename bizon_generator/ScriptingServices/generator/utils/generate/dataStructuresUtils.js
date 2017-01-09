/* globals $ */
/* eslint-env node, dirigible */

var templateUtils = require('generator/utils/templateUtils');

exports.generate = function(projectName, packageName, fileName, columnDefinitions) {
	var template = templateUtils.getTemplate('DataStructures', 'table', projectName, packageName, fileName);
	templateUtils.addDataStructureTableParameters(template, columnDefinitions);
	templateUtils.generateTemplate(template);
};
