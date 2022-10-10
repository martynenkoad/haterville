#!/bin/bash

cd ./frontend

npm i
npm run build
cp ../build-files/.htaccess ./build/.htaccess

cd ../backend
npm i
pm2 stop index.js -f
pm2 start index.js

