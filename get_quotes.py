import finnhub
import json
import time

API_KEY = "d0mgkc9r01qqqs59cob0d0mgkc9r01qqqs59cobg"
symbols = ["AAPL", "MSFT", "TSLA","GOOGL","AMZN"]
client = finnhub.Client(api_key=API_KEY)

def fetch_and_save_quotes():
    results = {}
    for symbol in symbols:
        try:
            quote = client.quote(symbol)
            results[symbol] = {
                "price" : quote["c"],
                "performance" : quote["dp"]
            }
            print(f"✅ {symbol} → {quote['c']}")
            time.sleep(1)  # éviter un burst sur l'API
        except Exception as e:
            print(f"❌ Erreur pour {symbol} :", e)

    with open('companies_data_price.json', 'w') as f:
        json.dump(results, f, indent=2)
        print("💾 Données mises à jour dans companies_data_price.json")

if __name__ == "__main__":
    while True:
        print("⏱️ Nouvelle interrogation Finnhub")
        fetch_and_save_quotes()
        time.sleep(30)  # attendre 60 secondes avant la prochaine interrogation
