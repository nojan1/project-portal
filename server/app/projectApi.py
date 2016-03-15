from flask.ext.restful import Resource, fields, marshal, reqparse
from projectRepository import *

from flask_injector import FlaskInjector
from injector import inject

project_fields = {
    'projectId': fields.String,
    'projectName': fields.String,
    'lastAccess': fields.String
}

class ProjectListAPI(Resource):
     @inject(projectRepository=ProjectRepository)
     def __init__(self, projectRepository):
        self.projectRepository = projectRepository
        super(ProjectListAPI, self).__init__()
        
     def get(self):
        return [marshal(project, project_fields) for project in self.projectRepository.getProjects()]
        
     def post(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('projectName', type = str, required = True, location = 'json')
        
        args = self.reqparse.parse_args()
        
        project = self.projectRepository.createProject(args["projectName"])
        
        return marshal(project, project_fields)