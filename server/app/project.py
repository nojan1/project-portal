from git import Repo
import os, json, tempfile, binascii

class Project(object):
    def __init__(self, config, projectId):
        self.__repoPath = os.path.join(config.GIT_REPO_DIRECTORY, projectId)
        self.repo = Repo(self.__repoPath )
        self.projectId = projectId
 
    def getFields(self):
        projectInfoBlob = self.__getProjectInfoBlob()
        if projectInfoBlob == None:
            raise Exception("No projectinfo file in repo")
    
        #jsonString = binascii.b2a_qp(projectInfoBlob.data_stream.read())
        jsonString = projectInfoBlob.data_stream.read().decode('ascii')

        obj = json.loads(jsonString)
        return {"lastAccess": self.repo.head.commit.committed_date,
                "projectName": obj["projectName"],
                "projectId": self.projectId}
                       
    def __getProjectInfoBlob(self):
        for blob in self.repo.tree().blobs:
            if blob.name == ".projectinfo.json":
                return blob
                
        return None
                
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
        
        
    

            
        

        
        