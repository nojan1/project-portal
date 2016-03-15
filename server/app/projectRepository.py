from git import Repo
from project import Project
from configProvider import ConfigProvider

import os
from injector import inject

class ProjectRepository(object):
    @inject(configProvider=ConfigProvider)
    def __init__(self, configProvider):
        self.__config = configProvider

    def getProjects(self):
        projects = []
        
        for entry in os.scandir(self.__config.GIT_REPO_DIRECTORY):
            if entry.is_dir() and os.path.exists(os.path.join(entry.path, ".git")):
                projects.append(Project(entry.name))
        
        return projects
        
    def createProject(self, projectName):
        projectId = projectName.replace(" ", "-")
        full_path = os.path.join(self.__config.GIT_REPO_DIRECTORY, projectId)
        
        if os.path.exists(full_path):
            raise Exception("Project path already exist")
            
        os.mkdir(full_path)
        return Project(projectId, projectName)
        
        
