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
    'noteContents': fields.String
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
        
     def post(self):
        pass