from git import Repo, util
import os, json, tempfile

class Project(object):
    def __init__(self, config, projectId):
        repoPath = os.path.join(config.GIT_REPO_DIRECTORY, projectId)
        self.repo = Repo(repoPath)
        self.projectId = projectId
 
    def getFields(self):
        infoFilePath = util.join_path(repoPath, "projectinfo.json")
        with open(infoFilePath, "r") as infile:
            obj = json.load(infile)
            
            return {"lastAccess": self.repo.head.commit.committed_date,
                    "projectName": obj["projectName"],
                    "projectId": self.projectId}
                
    def getFiles(self):
        pass
        
    def getNotes(self):
        pass
        
    def checkout(self):
        tmpPath = tempfile.mkdtemp()
        return self.repo.clone(tmpPath)

    def checkin(self, cloned_repo):
        #cloned_repo.remotes.origin.pull()
        cloned_repo.remotes.origin.push()
        
        
    

            
        

        
        