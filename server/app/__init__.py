from flask import Flask
from flask.ext.restful import Api

import config
from projectApi import *

app = Flask(__name__, static_url_path="")
api = Api(app)

api.add_resource(ProjectListAPI, config.API_PATH_PREFIX + "/projects")

if __name__ == "__main__":
    app.run(debug=True)