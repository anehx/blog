install:
	@cd frontend && npm i && bower i --allow-root

run:
	@vagrant up && vagrant ssh -c "cd /vagrant/frontend && npm start"

restart-apache:
	@vagrant ssh -c "sudo service apache2 restart"
