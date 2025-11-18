'''
salut,formation service est deja fini, maintenant il est temps de s'accuper des autres services pour le backend(flask),voici la structure de backend pour rappel: backend/

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

│   ├── run.py et voici structure se frontend pour rappel(react): src/

├── components/

│   ├── Navbar.js           # Terminé

│   ├── Footer.js           # Terminé

│   ├── CardFormations.js    # Terminé

│

├── pages/

│   ├── Home.js             # À améliorer (juste quelques informations de base)

│   ├── Login.js            # Terminé

│   ├── Register.js         # Terminé

│   ├── Formations.js       # Terminé

│   ├── Cart.js             # Terminé

│   ├── Checkout.js         # À améliorer mais fonctionnelle avec mocks

│   ├── Admin.js            # À améliorer (pas bien et fonctionnel)

│   ├── AdminFormation.js    # Fini

│   ├── AdminPersonnel.js     # À faire

├── services/

│   ├── userService.js      # Basique (à connecter)

│   ├── formationService.js  # Terminé (mocks)

│   ├── paymentService.js    # À faire

│   ├── orderService.js      # À faire

├── context/

│   ├── AuthContext.js      # À faire

│   ├── CartContext.js      # Terminé mais juste pour mocks

├── assets/

│   ├── images/             # En cours

│   ├── styles/             # En cours

├── App.js                  # Partiellement fait

├── index.js                # Terminé

voici explication supplementaire pour ce backend : Explications

- **Dossiers séparés** : Chaque microservice (`user-service`, `formation-service`, `order-service`, `payment-service`) a maintenant son propre dossier avec une structure interne similaire, mais isolée.

- **Structure interne** : Chaque microservice contient un dossier `app/` avec des sous-dossiers `models/` et `routes/`, ainsi que des fichiers `config.py` et `run.py` spécifiques à ce service.

- **Bases de données indépendantes** : Chaque `config.py` pointera vers une base de données MySQL distincte (ex. `user_db`, `formation_db`, etc.), ce qui respecte l'exigence d'une base de données par microservice.

- **Simplicité et scalabilité** : Cette structure permet de développer, tester et déployer chaque microservice indépendamment, avec des ports différents (ex. 5001 pour `user-service`, 5002 pour `formation-service`, etc.).
'''
#de nasiko sary capture formation frontend sy AdminFormation