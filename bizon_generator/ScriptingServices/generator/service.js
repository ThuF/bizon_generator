/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var templateUtils = require('generator/utils/templateUtils');

generateDataStructures_table();
generateScriptingServices_js_database_crud_extended();
generateWebContentForEntity_list_and_manage();

function generateDataStructures_table() {
	var templateType = 'DataStructures';
	var templateName = 'table';
	var projectName = 'Students';
	var packageName = 'students';
	var fileName = 'students.table';
	
	var columnDefinitions = [{
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
	
	var template = templateUtils.getTemplate(templateType, templateName, projectName, packageName, fileName);
	templateUtils.addDataStructureTableParameters(template, columnDefinitions);
	templateUtils.generateTemplate(template);
}

function generateScriptingServices_js_database_crud_extended() {
	var templateType = 'ScriptingServices';
	var templateName = 'js_database_crud_extended';
	var projectName = 'Students';
	var packageName = 'students';
	var fileName = 'students.js';
	
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
	
	var template = templateUtils.getTemplate(templateType, templateName, projectName, packageName, fileName);
	templateUtils.addEntityServiceParameters(template, entityName, tableName, tableType, tableColumns);
	templateUtils.generateTemplate(template);
}

function generateWebContentForEntity_list_and_manage() {
	var templateType = 'WebContentForEntity';
	var templateName = 'list_and_manage';
	var projectName = 'Students';
	var packageName = 'students';
	var fileName = 'students.html';

	var pageTitle = 'Students Home';
	var serviceFileName = '../../js/students/students.js';
	var tableColumns = [{
			"name":"id",
			"visible":true,
			"widgetType":"textarea",
			"label":"#",
			"primaryKey":true,
		}, {
			"name":"name",
			"visible":true,
			"widgetType":"textarea",
			"label":"Name",
		}, {
	      	"name":"age",
	      	"visible":true,
	      	"widgetType":"textarea",
	      	"label":"Age",
	      }
	];

	var template = templateUtils.getTemplate(templateType, templateName, projectName, packageName, fileName);
	templateUtils.addWebContentForEntityParameters(template, pageTitle, serviceFileName, tableColumns);
	templateUtils.generateTemplate(template);
}

response.flush();
response.close();
