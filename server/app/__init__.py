from flask import Flask
from flask.ext.restful import Api

import config
from projectApi import *

app = Flask(__name__, static_url_path="")
api = Api(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

api.add_resource(ProjectListAPI, config.API_PATH_PREFIX + "/projects")

if __name__ == "__main__":
    app.run(debug=True)