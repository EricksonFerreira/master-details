node:= cd angular; npm install; ng serve
# laravel:= cd laravel; php artisan serve
master:= git checkout origin/master
branch:= git checkout project-improvements


conf:
	$(MAKE) laravel
	$(node)

m:
	$(master)

b:
	$(branch)

# make c m=Mensagem 
c:
	git add .
	git commit -m "$m"
	git push 

laravel:
	sudo apt-get install php7.2 php7.2-mbstring php7.2-mysql php7.2-intl php7.2-xml composer
	composer install --no-scripts
	cp .env.example .env
	php artisan key:generate
	sudo apt-get install mysql-server-5.7
	mysql -u root -p --execute="drop database if exists materdetail; create database materdetail; drop user if exists 'materdetail'; create user 'materdetail' identified by 'materdetail'; grant all privileges on materdetail.* to 'materdetail';"
	sed -i 's/DB_DATABASE.*/DB_DATABASE=materdetail/' .env
	sed -i 's/DB_USERNAME.*/DB_USERNAME=materdetail/' .env
	sed -i 's/DB_PASSWORD.*/DB_PASSWORD=materdetail/' .env	
	php artisan migrate:refresh --seed
