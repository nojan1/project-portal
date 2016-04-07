from flask.ext.restful import Resource, fields, marshal, reqparse
from projectRepository import *

from flask_injector import FlaskInjector
from injector import inject

from configProvider import ConfigProvider
from projectRepository import ProjectRepository
from project import Project

note_fields = {
    'noteId': fields.String,
    'noteName': fields.String,
    'noteContent': fields.String
}

class NoteAPI(Resource):
     @inject(projectRepository=ProjectRepository, configProvider=ConfigProvider)
     def __init__(self, projectRepository, configProvider):
        self.__projectRepository = projectRepository
        self.__configProvider = configProvider
        super(NoteAPI, self).__init__()
        
     def get(self, projectId):
        project = Project(self.__configProvider, projectId)
        return [marshal(note, note_fields) for note in project.getNotes()]
        
     def post(self, projectId):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('noteId', type = str, required = True, location = 'json')
        self.reqparse.add_argument('noteName', type = str, required = True, location = 'json')
        self.reqparse.add_argument('noteContent', type = str, required = True, location = 'json')
        
        args = self.reqparse.parse_args()
        project = Project(self.__configProvider, projectId)
        
        project.putNote(args["noteId"], args["noteContent"])
        
        return marshal(args, note_fields)
        