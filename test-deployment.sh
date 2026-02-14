#!/bin/bash

# Test API routes
echo testing endpoints...
curl -X GET http://localhost:3000/api/health
curl -X GET http://localhost:3000/api/todos
curl -X GET http://localhost:3000/api/todos/pending
curl -X GET http://localhost:3000/api/notes
curl -X GET http://localhost:3000/api/notes/urgent
curl -X GET http://localhost:3000/api/notes/important

# Test typescript syntax
echo Checking for Typescript syntax errors..
if pnpm build; then
    echo "Build successful"
    echo "pushing changes to online repo..."
    git push origin emmd
    echo "switching to master branch.."
    git switch master && git merge emmd
    echo "pushing changes to master branch"
    git push origin master
    echo "swithcing back to emmd branch"
else
    echo "there is an error in the build"
    exit 1
fi