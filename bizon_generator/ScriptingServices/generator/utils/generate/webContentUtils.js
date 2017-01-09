/* globals $ */
/* eslint-env node, dirigible */

var templateUtils = require('generator/utils/templateUtils');

exports.generate = function(projectName, packageName, fileName, pageTitle, serviceFileName, tableColumns) {
	var template = templateUtils.getTemplate('WebContentForEntity', 'list_and_manage', projectName, packageName, fileName);
	templateUtils.addWebContentForEntityParameters(template, pageTitle, serviceFileName, tableColumns);
	templateUtils.generateTemplate(template);
};
