/* globals $ */
/* eslint-env node, dirigible */

var templateUtils = require('generator/utils/templateUtils');

exports.generate = function(projectName, packageName, fileName, columnDefinitions) {
	var template = templateUtils.getTemplate('DataStructures', 'table', projectName, packageName, fileName);
	addDataStructureTableParameters(template, columnDefinitions);
	templateUtils.generateTemplate(template);
};

function addDataStructureTableParameters(template, columnDefinitions) {
	template.templateParameters.columnDefinitions = columnDefinitions;
}
