package:= cd angular; npm install; ng serve
master:= git checkout origin/master
branch:= git checkout project-improvements

conf:
	$(package)

m:
	$(master)

b:
	$(branch)

# make c m=Mensagem 
c:
	git add .
	git commit -m "$m"
	git push 
