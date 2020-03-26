package:= cd angular; npm install; ng serve
conf:
	$(package)

master:
	git checkout master

te:
	git commit -m "$(@:git-%=%)"