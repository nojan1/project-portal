from flask.ext.restful import Resource, fields, marshal, reqparse
from projectRepository import *

from flask_injector import FlaskInjector
from injector import inject

from configProvider import ConfigProvider
from projectRepository import ProjectRepository

project_fields = {
    'projectId': fields.String,
    'projectName': fields.String,
    'lastAccess': fields.String
}

class ProjectListAPI(Resource):
     @inject(projectRepository=ProjectRepository, configProvider=ConfigProvider)
     def __init__(self, projectRepository, configProvider):
        self.__projectRepository = projectRepository
        self.__configProvider = configProvider
        super(ProjectListAPI, self).__init__()
        
     def get(self):
        return [marshal(project.getFields(), project_fields) for project in self.__projectRepository.getProjects()]
        
     def post(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('projectName', type = str, required = True, location = 'json')
        
        args = self.reqparse.parse_args()
        
        project = self.__projectRepository.createProject(args["projectName"])
        
        return marshal(project, project_fields)