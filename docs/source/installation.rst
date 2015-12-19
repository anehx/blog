Installation
============

Apache2
-------

Anforderungen
'''''''''''''
* Apache2
* PHP5.6
* mod_proxy, mod_proxy_http, mod_rewrite (Apache2 Module)
* php-sqlite

Konfiguration
'''''''''''''
Benutzen Sie die Beispielkonfiguration (tools/vagrant/vhost.conf) und ändern Sie die Pfade ab, sodass Sie stimmen. Zusätzlich müssen die oben genannten Apache2 Module aktiviert sein, dass die Kommunikation zwischen Front- und Backend funktioniert.

Die Variable API_URL in frontend/config.js muss auf den Hostnamen geändert werden (Wahrscheinlich http://localhost/api/v1).

Vagrant
-------
Falls Sie das Ganze etwas einfacher gestalten wollen, installieren Sie vagrant und führen Sie vagrant up im Hauptordner aus.

Zugangsdaten
------------

========  ========  ======
Username  Passwort  Admin?
========  ========  ======
admin     123qwe    Ja
tester    123qwe    Nein
========  ========  ======
