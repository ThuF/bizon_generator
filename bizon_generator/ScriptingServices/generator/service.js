/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var dataStructuresUtils = require('generator/utils/generate/dataStructuresUtils');
var scriptingServicesUtils = require('generator/utils/generate/scriptingServicesUtils');
var webContentUtils = require('generator/utils/generate/webContentUtils');

var projectName = 'Humans';
var packageName = 'humans';
var fileNameNoExtension = 'humans';
var serviceFileName = '../../js/' + packageName + '/' + fileNameNoExtension + '.js';
var pageTitle = 'Humans Home';

var columnDefinitions = [
	createDataStructureColumnDefinition('ID', 'INTEGER', undefined, true, true),
	createDataStructureColumnDefinition('FIRST_NAME', 'VARCHAR', 50, true, undefined),
	createDataStructureColumnDefinition('LAST_NAME', 'VARCHAR', 50, true, undefined),
	createDataStructureColumnDefinition('WEIGHT', 'INTEGER', undefined, true, undefined),
	createDataStructureColumnDefinition('DOB', 'DATE', undefined, true, undefined),
];
	
var tableColumns = [
	createScriptingServicesColumnDefinition('ID', 'INTEGER', true),
	createScriptingServicesColumnDefinition('FIRST_NAME', 'VARCHAR', undefined),
	createScriptingServicesColumnDefinition('LAST_NAME', 'VARCHAR', undefined),
	createScriptingServicesColumnDefinition('WEIGHT', 'INTEGER', undefined),
	createScriptingServicesColumnDefinition('DOB', 'DATE', undefined),
];

var tableColumnsWeb = [
	createWebContentColumnDefinition('ID', '#', 'integer', true),
	createWebContentColumnDefinition('FIRST_NAME', 'First Name', undefined, undefined),
	createWebContentColumnDefinition('LAST_NAME', 'Last Name', undefined, undefined),
	createWebContentColumnDefinition('WEIGHT', 'Weight (kg)', 'integer', undefined),
	createWebContentColumnDefinition('DOB', 'Date of Birth', 'date', undefined)
];

dataStructuresUtils.generate(projectName, packageName, fileNameNoExtension + '.table', columnDefinitions);
scriptingServicesUtils.generate(projectName, packageName, fileNameNoExtension + '.js', fileNameNoExtension.toUpperCase(), tableColumns);
webContentUtils.generate(projectName, packageName, fileNameNoExtension + '.html', pageTitle, serviceFileName, tableColumnsWeb);

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
