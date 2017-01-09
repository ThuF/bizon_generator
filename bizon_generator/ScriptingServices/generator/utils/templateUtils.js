/* globals $ */
/* eslint-env node, dirigible */

var generator = require('platform/generator');
var repository = require('platform/repository');
var worskapceUtils = require('generator/utils/workspaceUtils');

exports.getTemplate = function(type, templateName, projectName, packageName, fileName) {
	return {
		'type': type,
		'name': templateName,
		'templateParameters': {
			'fileName': fileName,
			'packageName': packageName,
			'fileNameNoExtension': getFileNameWithoutExtension(fileName),
		},
		'generationParameters': {
			'projectName': projectName,
			'packageName': packageName,
			'fileName': getFileNameWithoutExtension(fileName)
		}
	};
};

exports.addDataStructureTableParameters = function(template, columnDefinitions) {
	template.templateParameters.columnDefinitions = columnDefinitions;
};

exports.addWebContentForEntityParameters = function(template, pageTitle, serviceFileName, tableColumns) {
	template.templateParameters.pageTitle = pageTitle;
	template.templateParameters.serviceFileName = serviceFileName;
	template.templateParameters.tableColumns = tableColumns;
};
 
exports.addEntityServiceParameters = function(template, entityName, tableName, tableType, tableColumns) {
	template.templateParameters.entityName = entityName;
	template.templateParameters.tableName = tableName;
	template.templateParameters.tableType = tableType;
	template.templateParameters.tableColumns = tableColumns;
	template.templateParameters.INTEGER = 'INTEGER';
	template.templateParameters.VARCHAR = 'VARCHAR';
	template.templateParameters.CHAR = 'CHAR';
	template.templateParameters.BIGINT = 'BIGINT';
	template.templateParameters.SMALLINT = 'SMALLINT';
	template.templateParameters.FLOAT = 'FLOAT';
	template.templateParameters.DOUBLE = 'DOUBLE';
	template.templateParameters.DATE = 'DATE';
	template.templateParameters.TIME = 'TIME';
	template.templateParameters.TIMESTAMP = 'TIMESTAMP';
};

exports.generateTemplate = function(template) {
	var templatePath = getTemplateByType(template.type, template.name);
	var templateDefinition = getResourceAsJson(templatePath + '/template.json');
	
	for (var i = 0; i < templateDefinition.sources.length; i ++) {
		var source = templateDefinition.sources[i];
		var fileName = source.name;
		var fileContent = getResource(templatePath + '/' + fileName);
		if (source.action === 'generate') {
			fileContent = generator.generate(fileContent, template.templateParameters);
		}
		if (source.rename) {
			fileName = source.rename.replace('%s', template.generationParameters.fileName) + source.name.substring(source.name.lastIndexOf('.'));
		}
		try {
			worskapceUtils.create({
				'projectName': template.generationParameters.projectName,
				'rootFolder': source.rootFolder,
				'packageName': template.generationParameters.packageName,
				'packagePath': source.packagePath,
				'fileName': fileName,
				'fileContent': fileContent
			});
		} catch (e) {
			console.error('Error while creating [' + fileName + ']. ' + e);
		}
	}
};

function getFileNameWithoutExtension(fileName) {
	return fileName.substring(0, fileName.lastIndexOf('.'));
}

function getTemplateByType(type, name) {
	return '/db/dirigible/templates/' + type + '/' + name;
}

function getResource(path) {
	var resource = repository.getResource(path);
	return resource.getTextContent();
}

function getResourceAsJson(path) {
	return JSON.parse(getResource(path));
}
