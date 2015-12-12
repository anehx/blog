install:
	@cd frontend && npm i && bower i --allow-root

run:
	@vagrant up && vagrant ssh -c "cd /vagrant/frontend && npm start"

restart-apache:
	@vagrant ssh -c "sudo service apache2 restart"

prepare:
	@mkdir tmp/
	@cp -Rp backend/ tmp/backend
	@cd frontend && broccoli build dist
	@mv frontend/dist  tmp/frontend
	@cp tools/vhost.conf tmp/
	@sed -i 's/HASH: true/HASH: false/' tmp/frontend/app.js
	@rm tmp/backend/db/db.sqlite
	@touch tmp/backend/db/db.sqlite
	@sqlite3 tmp/backend/db/db.sqlite < tmp/backend/db/database.sql
	@sqlite3 tmp/backend/db/db.sqlite < tmp/backend/db/devdata.sql
	@chmod 775 tmp/backend/db
	@chmod 775 tmp/backend/db/db.sqlite
	@cd tmp && zip -r blog.zip *
	@mv tmp/blog.zip .
	@rm -rf tmp
