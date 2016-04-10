#!/bin/sh

cd client/
gulp || exit 1
cd ../

echo "Client build completed"
echo "Running server tests"

cd server/
if [ -d env ]; then
    PYTHONPATH=app env/Scripts/python -m pytest tests/* || exit 1
else
    python -m pytest tests/* || exit 1
fi

echo "Server tests completed"
echo "Building docker image"

cd ../
docker build -t project-portal .

[ ! -d build ] && mkdir build
docker save project-portal > build/project-portal.tar