package:= cd angular; npm install; ng serve
<<<<<<< HEAD
conf:
	$(package)

master:
	git checkout master

te:
	git commit -m "$(@:git-%=%)"
=======
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
>>>>>>> 25718df6bc51988d7453fc2c570258da8883da2a
