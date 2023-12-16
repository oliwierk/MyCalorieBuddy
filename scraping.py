import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import time

# Inicjalizacja Firebase
cred = credentials.Certificate('mycalbuddy-firebase-adminsdk-rb4am-0859253c84.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Liczba stron do przetworzenia
liczba_stron = 137

print("Rozpoczęcie przetwarzania danych")

# Iteracja przez strony
for page_number in range(1, liczba_stron + 1):
    url = f"https://kalkulatorkalorii.net/tabela-kalorii/{page_number}"
    print(f"Przetwarzanie strony: {url}")

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Błąd przy pobieraniu strony: {url}")
        continue

    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', class_='list calorie-table table table-striped table-hover')
    if not table:
        print("Tabela nie została znaleziona na stronie:", url)
        continue

    rows = table.find('tbody').find_all('tr')

    for row in rows:
        cells = row.find_all('td')
        if len(cells) >= 5:
            product_data = {
                "name": cells[0].get_text(strip=True),
                "calories": cells[1].get_text(strip=True),
                "protein": cells[2].get_text(strip=True),
                "carbs": cells[3].get_text(strip=True),
                "fats": cells[4].get_text(strip=True)
            }

            try:
                db.collection("products").document(product_data["name"]).set(product_data)
                print(f"Dane produktu '{product_data['name']}' zostały zapisane.")
            except Exception as e:
                print(f"Błąd zapisu produktu '{product_data['name']}': {e}")
        else:
            print("Nie znaleziono wystarczającej liczby kolumn na stronie:", url)

    # Opcjonalnie: dodaj opóźnienie, aby nie przeciążać serwera
    time.sleep(1)

print("Zakończono przetwarzanie wszystkich stron")
