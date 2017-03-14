# LoLProject

To get the project setup

1) install node https://nodejs.org/en/download/  
2) I use webstorm you can use sublime or w/e for your IDE  
3) clone the repo, run npm install from the base directory (the one with package.json) to pull in all depndencies of the project  
4) run the project with nodemon ./server  - nodemon makes it so you dont have to refresh the server each time you make a change and the executable is server  
5) go to localhost:8000 to test out a random page with a list of champions from LoL  
6) localhost:8000/form is just a test form that we will use later to do stuff, if you submit the form notice how the server knows what you submitted.  


Helpful Links  
https://server.youtube.com/playlist?list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR  - Node and Express Basics includes using DBs
https://school.scotch.io/build-a-nodejs-website?from=single   - Building a basic app with Node + Express  
https://expressjs.com/en/guide/using-middleware.html   - About Express  
http://es6-features.org/#Constants  - Learn ECMA 6 aka Javascript with functional programming    


# Mongo DB

Install MongoDB
https://www.mongodb.com/download-center?jmp=nav#community  
1) once installed make sure to create a /data/db folder ---> mkdir -p /data/db  
2) make sure /data/db has r/w permissions -->  sudo chmod 777 /data/db  

Testing mongo DB  
1) go to where you installed mongo go into /bin, see a list of executables run ./mongod (windows my be different)  
2) ./mongod has started the mongo server, open up another terminal window go to mongo directory run ./mongo  

Usefull commands (that i have encountered)  
1) db --> shows name of db  
2) db.data.insert({"username":"max"})  --> inserts json object into mongo's collection  
3) db.data.find() --> prints out entire db collection   
