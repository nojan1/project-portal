from git import Repo
import config, os

class Project(object):
    def __init__(self, projectId, projectName = ""):
        repoPath = os.path.join(config.GIT_REPO_DIRECTORY, projectId)
    
        if os.path.exists(os.path.join(repoPath, ".git")):
            self._repo = Repo(repoPath)
        else:
            self._repo = Repo.init(repoPath)
            self.initializeRepo(projectName)
        
        self.projectId = projectId

    def getFiles():
        pass
        
    def getNotes():
        pass
        
    def initializeRepo(self, projectName):
        pass

        
        