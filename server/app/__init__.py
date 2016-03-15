from flask import Flask
from flask.ext.restful import Api
from flask_injector import FlaskInjector
from injector import inject, Module, provides, singleton

from configProvider import *
from projectApi import *
from projectRepository import ProjectRepository

configProvider = FileConfigProvider("config.json")

def configure_ext(binder):
    binder.bind(ConfigProvider, to=configProvider, scope=singleton)
    binder.bind(ProjectRepository, to=ProjectRepository(), scope=singleton)
    

@inject(app=Flask)
def configure_api(binder, app):
        api = Api(app)
        api.add_resource(ProjectListAPI, configProvider.API_PATH_PREFIX + "/projects")
        
        binder.bind(Api, to=api, scope=singleton)

def main(debug):
    app = Flask(__name__)
    # app.config.update(
    #     debug=debug,
    # )

    # attach your views etc. here

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    FlaskInjector(app=app, modules=[configure_ext, configure_api])
    
    app.run(debug=debug)
    
if __name__ == "__main__":
    main(True)