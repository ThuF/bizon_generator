/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var generator = require('platform/generator');
var repository = require('platform/repository');

var worskapceGenerator = require('generator/workspace');

var templateName = 'js_database_crud_extended';
var projectName = 'Students';
var packageName = 'students';
var fileName = 'students.js';

var template = getTemplate(templateName, projectName, packageName, fileName);

var entityName = 'STUDENTS';
var tableName = 'STUDENTS';
var tableType = 'table';
var tableColumns = [{
	"name":"ID",
	"type":"INTEGER",
	"length":"0",
	"notNull":"true",
	"primaryKey":"true",
	"defaultValue":""
	}, {
		"name":"NAME",
		"type":"VARCHAR",
		"length":"50",
		"notNull":"false",
		"primaryKey":"false",
		"defaultValue":""
	}, {
      	"name":"AGE",
      	"type":"INTEGER",
      	"length":"0",
      	"notNull":"false",
      	"primaryKey":"false",
      	"defaultValue":""
      }
];
addEntityServiceParameters(template, entityName, tableName, tableType, tableColumns);

generateTemplate(template);

function getTemplate(templateName, projectName, packageName, fileName) {
	return {
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
}

function getFileNameWithoutExtension(fileName) {
	return fileName.substring(0, fileName.lastIndexOf('.'));
}

function addEntityServiceParameters(template, entityName, tableName, tableType, tableColumns) {
	template.templateParameters.entityName = entityName;
	template.templateParameters.tableName = tableName;
	template.templateParameters.tableType = tableType;
	template.templateParameters.tableColumns = tableColumns;
	template.templateParameters.INTEGER = 'INTEGER';
	template.templateParameters.VARCHAR = 'VARCHAR';
}

function generateTemplate(template) {
	var templatePath = getScriptingServicesTemplate(template.name);
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
}

response.flush();
response.close();

function getScriptingServicesTemplate(name) {
	return '/db/dirigible/templates/ScriptingServices/' + name;
}

function getResource(path) {
	var resource = repository.getResource(path);
	return resource.getTextContent();
}

function getResourceAsJson(path) {
	return JSON.parse(getResource(path));
}
