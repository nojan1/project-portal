#!/bin/sh

APP_ROOT="/srv"

cp $APP_ROOT/client/config-example.json $APP_ROOT/client/config.json
sed -i "s:{API_BASE_DOMAIN}:$API_BASE_DOMAIN:" $APP_ROOT/client/config.json

exec uwsgi --socket 0.0.0.0:3031 \
		   --chdir $APP_ROOT/server \
		   --pythonpath $APP_ROOT/server \
		   --pythonpath $APP_ROOT/server/app \
		   --callable app \
		   --wsgi-file $APP_ROOT/server/WSGI.py  \
		   --master --processes 4 --threads 2 \
		   --stats 0.0.0.0:3032 \
		   --check-static $APP_ROOT/client/ \
           --static-index index.html