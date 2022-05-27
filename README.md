Étapes à suivre pour exécuter le projet :

1 - Dans le répertoire "root", exécuter la commande : truffle migrate --reset ;
(Ceci permettra le déployement des smarts contracts vers la blockchain, ce qui générera de nouvelles addresses, qui seront disponibles dans "client/src/contracts/*.json")

2 - Copier coller les addresses depuis "client/src/contracts/Authentication.json" et "client/src/contracts/Courses.json" vers "client/src/config.json" ;
(Ces nouvelles addresses nous permettrons d'accéder à nos nouveaux smarts contracts)

3 - À partir du répertoire "client", lancer la commande : npm start ;

Version : 
- node : 14.17.0 ;
- npm : 6.14.13 ;
- truffle : 5.5.13 ;