#!/bin/sh

cd client/
gulp || exit 1
cd ../

echo "Client build completed"
echo "Running server tests"

cd server/
if [ -d env ]; then
    env/Scripts/py.test tests/* || exit 1
else
    py.test tests/* || exit 1
fi

echo "Server tests completed"
echo "Building docker image"

cd ../
docker build -t project-portal .