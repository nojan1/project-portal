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

def test_creating_new_project_return_project_object(projectRepo):
    project = projectRepo.createProject("Test project")
    assert project != None
     
def test_new_project_has_repo_object(projectRepo):
    project = projectRepo.createProject("Test project")
    assert project.repo != None
    
def test_new_project_add_projectinfofile_to_repo(projectRepo):
    project = projectRepo.createProject("Test project")

    for blob in project.repo.tree().blobs:
        if blob.name == ".projectinfo.json":
            assert True
            return
            
    assert False