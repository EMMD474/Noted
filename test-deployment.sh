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
echo Cecking for Typescript syntax errors..
pnpm build

# if no erros push changes to repo
# git push origin emmd