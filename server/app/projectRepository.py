from git import Repo
from project import Project
import config, os

class ProjectRepository(object):
    def getProjects(self):
        projects = []
        
        for entry in os.scandir(config.GIT_REPO_DIRECTORY):
            if entry.is_dir() and os.path.exists(os.path.join(entry.path, ".git")):
                projects.append(Project(entry.name))
        
        return projects
        
    def createProject(self, projectName):
        projectId = projectName.replace(" ", "-")
        full_path = os.path.join(config.GIT_REPO_DIRECTORY, projectId)
        
        if os.path.exist(full_path):
            raise Exception("Project path already exist")
            
        os.mkdir(full_path)
        return Project(projectId, projectName)
        
        
