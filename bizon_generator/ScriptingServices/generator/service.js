/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var templateUtils = require('generator/utils/templateUtils');

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

response.flush();
response.close();
