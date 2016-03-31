from pytest import *

from projectRepository import ProjectRepository
from project import Project
from configProvider import ConfigProvider

from injector import Injector, singleton

@fixture
def projectRepo(tmpdir):
    def configure(binder):
        binder.bind(ConfigProvider, to=ConfigProvider({"GIT_REPO_DIRECTORY": tmpdir.__str__()}), scope=singleton)

    injector = Injector(configure)
    return injector.get(ProjectRepository)
    
def test_getting_notes_on_new_project_should_return_empty_list(projectRepo):
    project = projectRepo.createProject("Test document repo")
    assert len(project.getNotes()) == 0
    
def test_adding_note_to_new_project_should_be_created_correctly(projectRepo):
    project = projectRepo.createProject("Test document repo")
    project.putNote("testNote.md", "test contents")
    
def test_adding_note_to_new_project_should_then_be_returned(projectRepo):
    project = projectRepo.createProject("Test document repo")
    project.putNote("testNote.md", "test contents")
    
    notes = project.getNotes()
    for note in notes:
        if note.noteName == "testNote.md":
            return
            
    assert False