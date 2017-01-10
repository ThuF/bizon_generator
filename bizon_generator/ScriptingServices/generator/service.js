/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');
var dataStructuresUtils = require('generator/utils/generate/dataStructuresUtils');
var scriptingServicesUtils = require('generator/utils/generate/scriptingServicesUtils');
var webContentUtils = require('generator/utils/generate/webContentUtils');

handleRequest(request, response);

function handleRequest(httpRequest, httpResponse, xss) {
	try {
		dispatchRequest(httpRequest, httpResponse, xss);
	} catch (e) {
		console.error(e);
		sendResponse(httpResponse, httpResponse.BAD_REQUEST, 'text/plain', e);
	}
}

function dispatchRequest(httpRequest, httpResponse) {
	response.setContentType('application/json; charset=UTF-8');
	response.setCharacterEncoding('UTF-8');

	switch (httpRequest.getMethod()) {
		case 'POST': 
			handlePostRequest(httpRequest, httpResponse);
			break;
		default:
			handleNotAllowedRequest(httpResponse);
	}
}

function handlePostRequest(httpRequest, httpResponse) {
	var template = getRequestBody(httpRequest);
	var projectName = template.projectName;
	var packageName = template.packageName;
	
	var dataStructuresFileName = template.dataStructures.fileName;
	var dataStructuresColumns = template.dataStructures.columns;
	
	var scriptingServicesFileName = template.scriptingServices.fileName;
	var scriptingServicesTableName = template.scriptingServices.tableName;
	var scriptingServicesColumns = template.scriptingServices.columns;
	
	var webContentFileName = template.webContent.fileName;
	var webContentPageTitle = template.webContent.pageTitle;
	var webContentServiceFileName = template.webContent.serviceFileName;
	var webContentColumns = template.webContent.columns;
	
	dataStructuresUtils.generate(projectName, packageName, dataStructuresFileName, dataStructuresColumns);
	scriptingServicesUtils.generate(projectName, packageName, scriptingServicesFileName, scriptingServicesTableName, scriptingServicesColumns);
	webContentUtils.generate(projectName, packageName, webContentFileName, webContentPageTitle, webContentServiceFileName, webContentColumns);
	sendResponse(httpResponse, httpResponse.CREATED, 'text/plain', '[DataStructures], [ScriptingServices], [WebContent]');
}

function handleNotAllowedRequest(httpResponse) {
	sendResponse(httpResponse, httpResponse.METHOD_NOT_ALLOWED);
}

function getRequestBody(httpRequest) {
	try {
		return JSON.parse(httpRequest.readInputText());
	} catch (e) {
		return null;
	}
}

function sendResponse(response, status, contentType, content) {
	response.setStatus(status);
	response.setContentType(contentType);
	response.println(content);
	response.flush();
	response.close();	
}
