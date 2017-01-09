/* globals $ */
/* eslint-env node, dirigible */

var templateUtils = require('generator/utils/templateUtils');

exports.generate = function(projectName, packageName, fileName, tableName, tableColumns) {
	var entityName = tableName;
	var template = templateUtils.getTemplate('ScriptingServices', 'js_database_crud_extended', projectName, packageName, fileName);
	templateUtils.addEntityServiceParameters(template, entityName, tableName, 'table', tableColumns);
	templateUtils.generateTemplate(template);
};
