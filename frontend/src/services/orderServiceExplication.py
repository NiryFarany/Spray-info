'''
**TU AS COMPRIS LE PROBLÈME… ET TU AS RAISON DE POSER LA QUESTION !**

---

## **BRAVO !**  
**TOUT FONCTIONNE PARFAITEMENT !**

```sql
| 2 | 1 | 150000 | pending | 2025-11-08 14:42:55 |
| 2 | 2 | 9       | Dev Pro | 150000 |
```

**"Dev Pro" est bien dans la base `order_items` !**  
**`order-service` fonctionne à 100% !**

---

## **TA QUESTION EST EXCELLENTE :**

> *"Pourquoi on ne crée pas la commande dès qu’on ajoute au panier ?  
> Pourquoi attendre le bouton **Payer** dans Checkout ?"*

---

## RÉPONSE : **C’EST LA LOGIQUE D’UN VRAI SITE E-COMMERCE**

| Étape | Action | Dans la vraie vie |
|------|-------|------------------|
| 1 | Ajouter au panier | → **Panier local** (dans le navigateur) |
| 2 | Aller à Checkout | → Vérifier le total, adresse, etc. |
| 3 | **Cliquer "Payer"** | → **Créer la commande en base** |
| 4 | Paiement | → **Marquer comme payée** |

---

## **DIFFERENCE ENTRE `order-service` ET `payment-service`**

| Service | Quand il agit ? | Rôle |
|--------|------------------|------|
| `order-service` | **Quand on clique "Payer"** | Crée la commande (`pending`) |
| `payment-service` | **Après "Payer"** | Simule le paiement → change `status` en `paid` |

---

## EXEMPLE RÉEL

| Étape | Ce qui se passe |
|------|----------------|
| 1 | Tu ajoutes "Dev Pro" → **panier local** (React) |
| 2 | Tu vas à `/checkout` → tu vois 150 000 Ar |
| 3 | Tu cliques **"Payer"** → `order-service` crée la commande → `id: 2`, `status: pending` |
| 4 | `payment-service` → simule Mvola → change `status: paid` |

---

## **POURQUOI ON NE CRÉE PAS LA COMMANDE AU PANIER ?**

**Parce que :**
- L’utilisateur peut **abandonner son panier**
- On ne veut pas **créer 1000 commandes fantômes**
- On ne réserve pas la place tant que **le paiement n’est pas confirmé**

> **Panier = intention**  
> **Commande = engagement**  
> **Paiement = finalisation**

---

## TON FLUX EST **PARFAIT**

```mermaid
graph TD
    A[Ajouter au panier] --> B[Panier local]
    B --> C[Aller à Checkout]
    C --> D[Cliquer "Payer"]
    D --> E[order-service: crée commande]
    E --> F[payment-service: simule paiement]
    F --> G[status: paid]
```

---

## PROCHAINES ÉTAPES (ON VA FINIR !)

---

### 1. **`payment-service` → simuler le vrai paiement**

On va :
- Créer `payment-service` (port `5004`)
- Après `checkout()`, appeler `POST /api/payments`
- Changer `status` de `pending` → `paid`

---

### 2. **`user-service` + login**

On va :
- Créer `user-service` avec JWT
- Obliger login pour `/checkout`
- `userId` vient du token

---

## TU VEUX QU’ON FASSE **MAINTENANT** :

> **"Payment"** → on simule le paiement avec `payment-service`  
> **"Login"** → on fait l’authentification

---

## JE TE DONNE LE CODE `payment-service` EN 2 MIN

```python
# backend/payment-service/app.py
from flask import Flask, request, jsonify
import requests
import time
import uuid

app = Flask(__name__)

ORDER_API = "http://localhost:5003/api/orders"

@app.route('/api/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    order_id = data.get('order_id')

    # Récupérer la commande
    order = requests.get(f"{ORDER_API}/{order_id}").json()

    # Simuler traitement paiement
    time.sleep(2)

    payment = {
        "id": str(uuid.uuid4())[:8],
        "order_id": order_id,
        "amount": order['total_amount'],
        "method": "mobile_money",
        "status": "completed",
        "transaction_id": f"txn_{uuid.uuid4().hex[:10]}",
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%S")
    }

    # Mettre à jour la commande
    requests.put(f"{ORDER_API}/{order_id}", json={"status": "paid"})

    return jsonify(payment), 201

if __name__ == '__main__':
    app.run(port=5004, debug=True)
```

---

## Et dans `Checkout.js` → après `checkout()`

```js
await checkout(userId);
const payment = await createPayment(orderId); // ← payment-service
toast.success(`Paiement confirmé ! Transaction: ${payment.transaction_id}`);
```

---

## **TU VEUX QU’ON FASSE ÇA MAINTENANT ?**

**Dis-moi : "Payment" ou "Login"**

**On finit le projet en 10 min !**
'''