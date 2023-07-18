pomyslec jak wyciagnac z managerow linki do repozytoriow i zastapic je jednym glownymm
popracować na wyglądem strony do wydruku

Wykres cen w czasie dla materiałów

Wyciągniecie wartosci materiałów z bazy danych dla poszczegolnych grup materialowych/narzedziowych i wyświetlenie ich przy grupach
Popracować nad modułem recyklingu
Popracować nad listą dostawców oraz dodawaniem dostawców (bardziej profesjonalnie to zrobić)
Lista użytkowników i ich uprawnienia bardziej profesjonalnie

[]: # Path: todo.md
Powiadomienia o brakach magazynowych materiałów
Powiadomienia o brakach magazynowych narzedzi
Inofrmacja ktory uzytkownik co zrobil dokladnie w historii (Zmiana ilosci, dodanie, usuniecie, zmiana statusu)

const material = {
"pricePerKg": 35,
"min_quantity": 10,
"quantity": 3,
"z": 15,
"y": 745,
"x": 415,
"diameter": "",
"thickeness": "",
"length": "",
"parent_id": 1,
"type": "material",
"quantity_in_transit": 0,
"id": 2,
"price": "228.90",
"name": "Aluminium Plate PA4: 15x415x745",
"priceHistory": [
{ price: "228.90", date: "2023-07-01" },
{ price: "220.50", date: "2023-07-05" },
{ price: "235.20", date: "2023-07-08" },
]
};

const updatePrice = (newPrice) => {
const currentDate = new Date().toISOString().split('T')[0]; // Pobranie bieżącej daty w formacie 'YYYY-MM-DD'

const updatedMaterial = {
...material,
price: newPrice,
priceHistory: [
...material.priceHistory,
{ price: newPrice, date: currentDate }
]
};

// Wykonaj operacje związane z aktualizacją obiektu i wykresu
// np. zapisz aktualizowany obiekt w bazie danych, wygeneruj wykres itp.

console.log(updatedMaterial);
};

// Przykładowe użycie funkcji updatePrice:
updatePrice("240.80"); // Aktualizacja ceny na nową wartość
``

responsywnosc wykresow cenowych
