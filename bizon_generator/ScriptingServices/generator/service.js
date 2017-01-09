/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var dataStructuresUtils = require('generator/utils/generate/dataStructuresUtils');
var scriptingServicesUtils = require('generator/utils/generate/scriptingServicesUtils');
var webContentUtils = require('generator/utils/generate/webContentUtils');

var requestBody = {
	'projectName': 'Humans',
	'packageName': 'humans_package',
	'dataStructures': {
		'fileName': 'humans.table',
		'columns': [
			createDataStructureColumnDefinition('ID', 'INTEGER', undefined, true, true),
			createDataStructureColumnDefinition('FIRST_NAME', 'VARCHAR', 50, true, undefined),
			createDataStructureColumnDefinition('LAST_NAME', 'VARCHAR', 50, true, undefined),
			createDataStructureColumnDefinition('WEIGHT', 'INTEGER', undefined, true, undefined),
			createDataStructureColumnDefinition('DOB', 'DATE', undefined, true, undefined)
		]
	},
	'scriptingServices': {
		'fileName': 'humans.js',
		'tableName': 'HUMANS',
		'columns': [
			createScriptingServicesColumnDefinition('ID', 'INTEGER', true),
			createScriptingServicesColumnDefinition('FIRST_NAME', 'VARCHAR', undefined),
			createScriptingServicesColumnDefinition('LAST_NAME', 'VARCHAR', undefined),
			createScriptingServicesColumnDefinition('WEIGHT', 'INTEGER', undefined),
			createScriptingServicesColumnDefinition('DOB', 'DATE', undefined),
		]
	},
	'webContent': {
		'fileName': 'humans.html',
		'pageTitle': 'Humans Home',
		'serviceFileName': '../../js/humans_package/humans.js',
		'columns': [
			createWebContentColumnDefinition('ID', '#', 'integer', true),
			createWebContentColumnDefinition('FIRST_NAME', 'First Name', undefined, undefined),
			createWebContentColumnDefinition('LAST_NAME', 'Last Name', undefined, undefined),
			createWebContentColumnDefinition('WEIGHT', 'Weight (kg)', 'integer', undefined),
			createWebContentColumnDefinition('DOB', 'Date of Birth', 'date', undefined)
		]
	}
};

var projectName = requestBody.projectName;
var packageName = requestBody.packageName;

var dataStructuresFileName = requestBody.dataStructures.fileName;
var dataStructuresColumns = requestBody.dataStructures.columns;

var scriptingServicesFileName = requestBody.scriptingServices.fileName;
var scriptingServicesTableName = requestBody.scriptingServices.tableName;
var scriptingServicesColumns = requestBody.scriptingServices.columns;

var webContentFileName = requestBody.webContent.fileName;
var webContentPageTitle = requestBody.webContent.pageTitle;
var webContentServiceFileName = requestBody.webContent.serviceFileName;
var webContentColumns = requestBody.webContent.columns;

dataStructuresUtils.generate(projectName, packageName, dataStructuresFileName, dataStructuresColumns);
scriptingServicesUtils.generate(projectName, packageName, scriptingServicesFileName, scriptingServicesTableName, scriptingServicesColumns);
webContentUtils.generate(projectName, packageName, webContentFileName, webContentPageTitle, webContentServiceFileName, webContentColumns);

response.flush();
response.close();

function createDataStructureColumnDefinition(name, type, length, notNull, primaryKey, defaultValue) {
	return {
		'name': name.toUpperCase(),
		'type': type.toUpperCase(),
		'length': length ? length : 0,
		'notNull': notNull ? notNull : false,
		'primaryKey': primaryKey ? primaryKey : false,
		'defaultValue': defaultValue ? defaultValue : ''
	};
}

function createScriptingServicesColumnDefinition(name, type, primaryKey) {
	return {
		'name': name,
		'type': type,
		'primaryKey': primaryKey ? primaryKey : false
	};
}

function createWebContentColumnDefinition(name, label, widgetType, primaryKey) {
	return {
		'name': name.toLowerCase(),
		'label': label ? label : name,
		'widgetType': widgetType,
		'primaryKey': primaryKey ? primaryKey : false,
		'visible': true
	};
}
