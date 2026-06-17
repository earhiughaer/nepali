# Nepali Lernen

Private, statische PWA zum Lernen von Nepali auf iPhone und Desktop.

## Funktionen

- Hauptmenue mit Ueben, Alphabet, Schreiben, Tageswerten und Wortuebersicht nach Stufe
- Gefuehrter Uebungsmodus mit Buchstaben, Schreibaufgaben, Zahlen, Woertern und Saetzen
- Alphabet-Karteikarten fuer Devanagari-Zeichen als manueller Zusatzbereich
- Zeichenmodus: erst schreiben, dann mit Vorlage und grobem Aehnlichkeitswert vergleichen als manueller Zusatzbereich
- 70 A1-nahe Woerter mit Karteikarten, Kategorie und Stufe
- 30 einfache Saetze aus dem Grundwortschatz
- Konsonanten werden im Uebungsmodus vor den Vokalen in traditioneller Reihenfolge eingefuehrt
- Wiederholungssystem mit faelligen Karten
- Fortschritt lokal im Browser ueber `localStorage`
- Offline-Cache ueber Service Worker, sobald die App ueber eine gueltige Web-Origin laeuft

## Wiederholungssystem

Buchstaben, Woerter und Saetze starten in Stufe 1. Im gefuehrten Uebungsmodus wird am Ende einer Runde geschaut, was schon sicher sitzt und was nochmal geuebt werden sollte. Ein Lerninhalt kommt nur weiter, wenn alle dazu passenden Aufgaben in dieser Runde richtig waren. Bei einem Fehler faellt dieser Inhalt um zwei Stufen zurueck, aber nie unter Stufe 1.

Der Lernweg ist bewusst gestuft:

- Zuerst werden neue Inhalte pur eingefuehrt: Buchstaben mit Klang und Schreibbild, maximal ein neues Wort, danach neue Saetze.
- Danach mischt die App die Aufgaben: Buchstaben erkennen, Buchstaben schreiben, Bedeutung zuordnen, hoerend erkennen, Satzbau und Selbstabfrage kommen verteilt statt direkt hintereinander.
- Pro Buchstabe, Wort und Satz wird separat gemerkt, ob er schon sicher sitzt.
- Zahlen sind Teil des Wortschatzes und werden gezielt in den Uebungsmodus geholt.
- Alphabet und Schreiben bleiben zusaetzlich verfuegbar, falls einzelne Inhalte gezielt wiederholt werden sollen.

Die Intervalle sind in [content.js](content.js) definiert:

```js
[0, 1, 4, 9, 18, 40]
```

Das bedeutet: Stufe 1 ist sofort faellig, Stufe 2 morgen, dann nach 4, 9, 18 und 40 Tagen. Die Daten bleiben lokal auf dem Geraet.

## Lokal testen

```bash
cd nepali-pwa
python3 -m http.server 4173
```

Dann im Browser oeffnen:

```text
http://127.0.0.1:4173/
```

## Auf dem iPhone nutzen

Der einfachste Weg ohne App Store ist eine PWA:

1. Den Ordner `nepali-pwa` bei GitHub Pages, Netlify, Cloudflare Pages oder einem anderen statischen HTTPS-Host bereitstellen.
2. Die HTTPS-Adresse in Safari auf dem iPhone oeffnen.
3. Teilen antippen.
4. `Zum Home-Bildschirm` auswaehlen.

Wichtig: Fuer echtes Offline-Verhalten und Service Worker braucht die App HTTPS. Ueber `http://<Mac-IP>:4173` im gleichen WLAN kann man testen, aber iOS behandelt das nicht wie eine vollwertige installierbare PWA.

## Inhalte erweitern

Die Lerninhalte stehen in [content.js](content.js):

- `words` fuer Vokabeln
- `sentences` fuer einfache Saetze
- `phaseIntervals` fuer das Wiederholungssystem

Neue Eintraege koennen direkt in den jeweiligen Arrays ergaenzt werden. Wichtig: Bestehende `id`-Werte duerfen nicht umbenannt werden, weil der Lernfortschritt stabil ueber diese IDs gespeichert wird. Neue Inhalte bekommen einfach neue, eindeutige IDs.

## Audio

Die Aussprachedateien liegen unter:

- `audio/words/*.wav`
- `audio/sentences/*.wav`

Sie wurden lokal mit macOS `say` und der Devanagari-faehigen Stimme `Lekha` erzeugt. Das ist keine professionelle native Nepali-Aufnahme, aber fuer eine private Lern-App deutlich stabiler als die reine Browser-Sprachausgabe. Wenn spaeter echte Aufnahmen oder bessere TTS-Dateien vorliegen, koennen sie mit denselben Dateinamen ersetzt werden.
