install:
	@cd frontend && npm i && bower i --allow-root

run:
	@vagrant up && vagrant ssh -c "cd /vagrant/frontend && npm start"

guide:
	@rm -rf docs/build && sphinx-build -b html docs/source/ docs/build/

guide-watch:
	@while true; do inotifywait -r -e close_write docs; make guide; done

restart-apache:
	@vagrant ssh -c "sudo service apache2 restart"

prepare: guide
	@rm -rf tmp/
	@mkdir tmp/
	@cp -Rp backend/ tmp/backend
	@cp -Rp tools/ tmp/tools
	@cp Vagrantfile tmp/Vagrantfile
	@mv tmp/tools/vhost.conf tmp/tools/vagrant/vhost.conf
	@cd frontend && broccoli build dist
	@mv frontend/dist  tmp/frontend
	@cp -R docs/build tmp/frontend/docs
	@sed -i 's/HASH: true/HASH: false/' tmp/frontend/js/config.js
	@rm tmp/backend/db/db.sqlite
	@touch tmp/backend/db/db.sqlite
	@sqlite3 tmp/backend/db/db.sqlite < tmp/backend/db/database.sql
	@sqlite3 tmp/backend/db/db.sqlite < tmp/backend/db/devdata.sql
	@chmod 775 tmp/backend/db
	@chmod 775 tmp/backend/db/db.sqlite
	@mv tmp/tools/README.txt tmp/README.txt 2>/dev/null
	@mv tmp/tools/vagrant/setup_prod.sh tmp/tools/vagrant/setup.sh
	@cd tmp && zip -r blog.zip *
	@mv tmp/blog.zip .
	@rm -rf tmp
