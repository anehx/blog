#!/bin/bash

add-apt-repository ppa:ondrej/php5-5.6
apt-get update
apt-get -q -y install apache2 php5 php5-dev php5-xdebug curl vim php5-sqlite make

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs

a2enmod rewrite

usermod -a -G vagrant www-data

rm /etc/apache2/sites-enabled/000-default
ln -s /etc/apache2/sites-enabled/blog /vagrant/tools/vagrant/vhost.conf

service apache2 restart
npm i -g bower
cd /vagrant && make install
