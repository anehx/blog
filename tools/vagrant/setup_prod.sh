#!/bin/bash

add-apt-repository ppa:ondrej/php5-5.6
apt-get update
apt-get -q -y install apache2 php5 php5-dev php5-xdebug curl vim php5-sqlite make

a2enmod rewrite
a2enmod proxy
a2enmod proxy_http

usermod -a -G vagrant www-data

rm /etc/apache2/sites-enabled/*
ln -s /vagrant/tools/vagrant/vhost.conf /etc/apache2/sites-enabled/blog.conf

service apache2 restart
