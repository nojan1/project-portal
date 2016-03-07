from flask.ext.restful import Resource, fields, marshal
from projectRepository import *

project_fields = {
    'projectId': fields.String,
    'projectName': fields.String,
    'lastAccess': fields.String
}

class ProjectListAPI(Resource):
     def __init__(self):
        super(ProjectListAPI, self).__init__()
        
     def get(self):
        return {'projects': [marshal(project, project_fields) for project in ProjectRepository().getProjects()]}