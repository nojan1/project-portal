#!/bin/sh

APP_ROOT="/srv"

exec uwsgi --socket 0.0.0.0:80 \
		   --chdir $APP_ROOT/server \
		   --wsgi-file server/WSGI.py  \
		   --master --processes 4 --threads 2 \
		   --stats 0.0.0.0:8080 \
		   --check-static $APP_ROOT/client/ \
           --static-index index.html