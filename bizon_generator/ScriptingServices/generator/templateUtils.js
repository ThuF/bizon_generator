/* globals $ */
/* eslint-env node, dirigible */

var worskapceGenerator = require('generator/workspace');
var generator = require('platform/generator');
var repository = require('platform/repository');

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

exports.addEntityServiceParameters = function(template, entityName, tableName, tableType, tableColumns) {
	template.templateParameters.entityName = entityName;
	template.templateParameters.tableName = tableName;
	template.templateParameters.tableType = tableType;
	template.templateParameters.tableColumns = tableColumns;
	template.templateParameters.INTEGER = 'INTEGER';
	template.templateParameters.VARCHAR = 'VARCHAR';
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
			worskapceGenerator.create({
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
