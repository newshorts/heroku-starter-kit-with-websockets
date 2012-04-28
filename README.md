heroku-starter-kit-with-websockets
==================================

Heroku Starter with Websockets

Intended to be able to start a new app with heroku, and get it up and running locally and on their servers in no time.

To start a new heroku app do this (user this for reference: https://devcenter.heroku.com/articles/nodejs):

heroku login
(make sure to create your package.json file first)
npm install (in the directory you wish to work with)
(make a .gitignore file for node_modules)
(make a Procfile with "web: node web.js" in it)
foreman start (to run locally)
git init
git add .
git commit -m "init"
heroku create --stack cedar
git push heroku master
heroku ps: scale web=1
heroku ps
heroku logs

if your process dies you many need to restart:
heroku web.1 restart

if you want to stop the process:
heroku web.1 stop

Thanks!
Mike Newell
