from flask.ext.restful import Resource, fields, marshal, reqparse
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
        return [marshal(project, project_fields) for project in ProjectRepository().getProjects()]
        
     def post(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('projectName', type = str, required = True, location = 'json')
        
        args = self.reqparse.parse_args()
        print(args)
        project = ProjectRepository().createProject(args["projectName"])
        
        return marshal(project, project_fields)