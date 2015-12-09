install:
	@cd frontend && npm i && bower i --allow-root

run:
	@vagrant ssh -c "cd /vagrant/frontend && npm start"
