# Environment Setup

### Generic
1) install node https://nodejs.org/en/download/  
2) I use webstorm you can use sublime or w/e for your IDE  
3) clone the repo, run npm install from the base directory (the one with package.json) to pull in all depndencies of the project  
4) run the project with nodemon ./server  - nodemon makes it so you dont have to refresh the server each time you make a change and the executable is server  
5) go to localhost:8000 to test out a random page with a list of champions from LoL  
6) localhost:8000/form is just a test form that we will use later to do stuff, if you submit the form notice how the server knows what you submitted.  

### Native Windows
1. Download and install Git for Windows from https://git-scm.com/download/win
    1. For better powershell integration, try out posh-git as well: https://github.com/dahlbyk/posh-git
1. Download and install NodeJS from https://nodejs.org/en/download/
1. Clone the project
    1. Open a PowerShell console.
    1. Move to the directory you want the project to be cloned in.
    1. Run `git clone https://github.com/michaelmld/LoLProject.git`
1. Install project dependencies
    1. Move to the `LoLProject` directory.
    1. Run `npm install`
1. Run the project: `npm run server`

### BashOnWindows (Need at least Windows 10 Creators Update i.e. Windows versions 15063+)
1. Setup on BashOnWindows
    1. Open Run window (`win+r`), type in `ms-settings:developers`, press enter.
    1. Select the `Developer mode` radio button. Accept the popup if there is one.
    1. Open Run window (`win+r`), type in `optionalfeatures.exe`, press enter.
    1. Find and check the box for `Windows Subsystem for Linux (Beta)`.
    1. Restart.
    1. Open Bash console window by typing `bash` into a cmd/powershell console or into the Run window.
    1. Accept the license and wait for the download and extraction to finish.
    1. Enter username/password.
    1. Run `sudo apt-get update` to get any updates.
    1. Run `sudo apt-get upgrade` to upgrade any packages that need it (this could take a while).
    1. Done with the setup! Now you can open a bash command prompt at any time using any of the methods mentioned above.
1. Open a bash command prompt.
1. Install git: `sudo apt-get install -y git`
1. Install nodejs:
    1. Set version to install (LTS is 6.x as of writing this): `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
    1. Install: `sudo apt-get install -y nodejs`
    1. Setup symlink for node (don't skip this): ``[[ $(which node) ]] || ln -s `which nodejs` /usr/bin/node``
1. Clone the project: 
    1. Move to the directory you want the project to be cloned in.
    1. Run `git clone https://github.com/michaelmld/LoLProject.git`
1. Install project dependencies:
    1. Move to the `LoLProject` directory.
    1. Run `npm install`
1. Run the project: `npm run server`

#How to run tests   
npm test   

# Learning Material
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
