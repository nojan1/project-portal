from git import Repo
import config, os, json

class Project(object):
    def __init__(self, projectId, projectName = ""):
        repoPath = os.path.join(config.GIT_REPO_DIRECTORY, projectId)
    
        if os.path.exists(os.path.join(repoPath, ".git")):
            self._repo = Repo(repoPath)
        else:
            self._repo = Repo.init(repoPath)
            self.initializeRepo(repoPath, projectName)
        
        self.projectId = projectId
        
        infoFilePath = os.path.join(repoPath, ".projectinfo.json")
        if not os.path.exists(infoFilePath):
            raise Exception("Repo does not contain .projectinfo.json")

        with open(infoFilePath, "r") as infile:
            obj = json.load(infile)
            print(obj)
            self.projectName = obj["projectName"]
            
        self.lastAccess = self._repo.head.commit.committed_date

    def getFiles():
        pass
        
    def getNotes():
        pass
        
    def initializeRepo(self, repoPath, projectName):
        infoFilePath = os.path.join(repoPath, ".projectinfo.json")
        with open(infoFilePath, "w") as outfile:
            json.dump({"projectName": projectName}, outfile, indent = 4)
            
        self._repo.git.add(u=True)
        self._repo.index.commit("initial commit")
            
        

        
        