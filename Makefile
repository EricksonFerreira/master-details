package:= cd angular; npm install; ng serve
master:= git checkout master
branch:= git checkout project-improvements
git:= git add .; git commit -m "$m"; git push 

conf:
	$(package)

m:
	$(master)

b:
	$(branch)
	
git:
	$(git)
