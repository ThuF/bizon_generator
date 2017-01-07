/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var generator = require('platform/generator');
var repository = require('platform/repository');

var worskapceGenerator = require('generator/workspace');

generateTemplate({
	'name': 'js_database_crud_extended',
	'templateParameters': {
		'fileName': 'students.js',
		'packageName': 'leo',
		'fileNameNoExtension': 'students',
		'entityName': 'STUDENTS',
		'tableName': 'STUDENTS',
		'tableType': 'table',
		'tableColumns': [
			{
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
		],
		'INTEGER': 'INTEGER',
		'VARCHAR': 'VARCHAR'
	},
	'generationParameters': {
		'projectName': 'Students',
		'packageName': 'leo',
		'fileName': 'students'
	}
});

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
