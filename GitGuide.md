# git bash repo instructions:

1. open git bash exe
2. cd ( go to directory folder using git cmd)
   cd /c/ReactVS/React-Node-Sql
3. git init
4. git remote add origin (Get Link in github.com account in repository)
5. git -v
6. git remote -v
7. git add .
8. git commit -m "Name of the File"
9. git push origin master
10. git reset HEAD~1 (IF you have NOT pushed your changes to remote)

git bash update instructions

1. open git bash exe
2. cd ( go to directory folder using git cmd)
   cd c:\ReactVS\Node-React-1.0
3. git status
4. git add .
5. git commit -m "Description of changes"
6. git status (check updates)
7. git push origin master

8. git remote rm origin -- add version and renew link in github.
9. git config --get remote.origin.url ----- check current github url

# UNCERTAIN CHANGES

1. git reset HEAD~1 (committed but not yet pushed)

# UNTRACK .ENV FILES

1. git rm -r --cached .env
2. git add .gitignore
3. git commit -m 'untracking .env'
4. git push origin master

node server
FIX: edit the node js instructions

1. npm init -y ------ create package json file
2. npm i express
3. npm i -D nodemon
4. npm install -g live-server
