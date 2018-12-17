@echo off

start "" "mongod"

cd .\MongoDB\
start "" node server.js

cd ..
cd .\IonicCordova\myApp\

start "" ionic serve --no-open


start "" chrome "http://localhost:8095/" "http://localhost:8100/"