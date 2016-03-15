import json

class ConfigProvider(object):
    def __init__(self, configValues):
        # if configValues is not dict:
        #     raise Exception("configValues has to be a dictionary")
    
        self.__configValues = dict(configValues)
        
    def __getattr__(self,name):
        # if not self.__configValues.has_key(name):
        #     raise Exception("No such configValue " + name)
            
        return self.__configValues[name]
       
class FileConfigProvider(ConfigProvider):
    def __init__(self, configFileName):
        with open(configFileName, "r") as configFile:
            ConfigProvider.__init__(self, json.load(configFile))