'''
le developpement de cette application est fini, on a fait de beau travail, merci bcp à toi, il ne reste plus que des amelioration et extension des fonctionnalité si on va le faire, bien sur mais parlons un peu; en fait le vrai but de ce projet n'est pas developpement mais deploiement, puisque mon thème est "Creation d'une plateforme d'information et d'inscription pour formation Presentielles de Spray Info Formation avec architecture Microservice , base de données Dedicacées et Deploiement avec Docker Compose"; alors ce qu'il nous reste à faire alors c'est deploiement avec Docker compose n'est ce pas; on ne va pas le faire aujourd'hui an,on faire une pause et on continuera demain; et c'est pour ça que je veux qu'on parle un peu parce que je ne sais rien de Devops, je suis debutante, alors je ne sais pas  de de deploiement; alors comment ça sera, est ce que c'est pas difficile? peut etre ça dure longtemps ou pas?moi jes suis debutant au sur github, docker et tous ça et surtout concernant devops et ses outils; je sais qu'il y aura CI(integration Continus )et CD(Developpement Continu) n'est ce pas, et il y a jenkins aussi??? tous ça ce sont mes soucis, c'est pour ça que je t'en parle; voici rappel backend: backend/

├── user-service/

│   ├── app/

│   │   ├── _init_.py

│   │   ├── models/

│   │   │   ├── _init_.py

│   │   │   ├── user.py

│   │   ├── routes/

│   │   │   ├── _init_.py

│   │   │   ├── user_routes.py

│   ├── config.py

│   ├── run.py

├── formation-service/

│   ├── app/

│   │   ├── _init_.py

│   │   ├── models/

│   │   │   ├── _init_.py

│   │   │   ├── formation.py

│   │   ├── routes/

│   │   │   ├── _init_.py

│   │   │   ├── formation_routes.py

│   ├── config.py

│   ├── run.py

├── order-service/

│   ├── app/

│   │   ├── _init_.py

│   │   ├── models/

│   │   │   ├── _init_.py

│   │   │   ├── order.py

│   │   ├── routes/

│   │   │   ├── _init_.py

│   │   │   ├── order_routes.py

│   ├── config.py

│   ├── run.py

├── payment-service/

│   ├── app/

│   │   ├── _init_.py

│   │   ├── models/

│   │   │   ├── _init_.py

│   │   │   ├── payment.py

│   │   ├── routes/

│   │   │   ├── _init_.py

│   │   │   ├── payment_routes.py

│   ├── config.py

│   ├── run.py

structure backend et voici rappel Frontend: src/

├── components/

│   ├── Navbar.js           

│   ├── Footer.js           

│   ├── CardFormations.js    

│   │── ProtectedRoute.js    

│

├── pages/

│   ├── Home.js             

│   ├── Login.js           

│   ├── Register.js         

│   ├── Formations.js     

│   ├── Cart.js             

│   ├── Checkout.js         

│   │── Confirmation.js     

│   ├── Admin.js            

│   ├── AdminFormation.js   

│   ├── AdminPersonnel.js    

│   │── MyOrders.js         

│   │── OrderDetail.js       

│   │── AdminOrders.js      

│   │── AboutUs.js          

       les autres pages

├── services/

│   ├── userService.js      

│   ├── formationService.js 

│   ├── paymentService.js    

│   ├── orderService.js    

├── context/

│   ├── AuthContext.js    

│   ├── CartContext.js     

├── assets/

│   ├── images/           

│   ├── styles/           

├── App.js                 

├── index.js               

remarque:
pour la base de données, on aussi 4 base de données formation_db,order_db,payment_db,user_db
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| formation_db       |
| information_schema |
| order_db           |
| payment_db         |
| performance_schema |
| user_db            |
+--------------------+
6 rows in set (0.02 sec)

mysql>

'''