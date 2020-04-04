node:= cd angular; npm install; ng serve
# laravel:= cd laravel; php artisan serve
master:= git checkout origin/master
branch:= git checkout project-improvements

conf:
	$(node)

# $(laravel)

m:
	$(master)

b:
	$(branch)

# make c m=Mensagem 
c:
	git add .
	git commit -m "$m"
	git push 
