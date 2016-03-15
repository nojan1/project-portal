#!/bin/sh

cd client/
gulp
cd ../

cd server/
python tests/all.py

docker build -t project-portal .