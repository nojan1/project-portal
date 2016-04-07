from git import Repo, InvalidGitRepositoryError
from project import Project
from configProvider import ConfigProvider

import os, json, codecs
from injector import inject

class ProjectRepository(object):
    @inject(configProvider=ConfigProvider)
    def __init__(self, configProvider):
        self.__config = configProvider

    def getProjects(self):
        projects = []
        
        for entry in os.scandir(self.__config.GIT_REPO_DIRECTORY):
            if entry.is_dir():
                try:
                    projects.append(Project(self.__config, entry.name))
                except InvalidGitRepositoryError:
                    continue
        
        return projects
        
    def createProject(self, projectName):
        projectId = projectName.replace(" ", "-")
        full_path = os.path.join(self.__config.GIT_REPO_DIRECTORY, projectId)
        
        if os.path.exists(full_path):
            raise Exception("Project path already exist")
            
        os.mkdir(full_path)
        Repo.init(full_path, bare=True)
        
        project = Project(self.__config, projectId)
        
        self.__initializeRepo(project, projectName)
        
        return project

    def __initializeRepo(self, project, projectName):
        cloned_repo = project.checkout()
    
        infoFilePath = os.path.join(cloned_repo.working_dir, ".projectinfo.json")
        with codecs.open(infoFilePath, "w", "utf-8") as outfile:
            json.dump({"projectName": projectName}, outfile, indent = 4)
            
        cloned_repo.index.add([infoFilePath])
        cloned_repo.index.commit("initial commit")
        
        project.checkin(cloned_repo)
        
        
