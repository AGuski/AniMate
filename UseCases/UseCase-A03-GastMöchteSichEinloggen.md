#  Use Case A03: Gast loggt sich ein, um Zugriff zu erhalten

## Main Flow 

1. System präsentiert Login-Maske: 
    - Feld **Name**  (Fokus!) 
    - Feld **Passwort**
    - Button **Login**
2. Gast gibt Benutzernamen ein
3. Gast navigiert zum Feld **Passwort** 
4. Gasr gibt Passwort ein (Zeichen nicht sichtbar)
5. Gast drückt Return oder klickt auf **Login**
6. System authorisiert Gast 
   - dieser welchselt damit die Rolle zu **Anwender**
7. System wechselt zu Screen X

---

## Alternativen / Erweiterungen


### 1a. Registrierung eines neuen Users

1. System präsentiert weiteren Button **Registrieren**
2. User klickt auf **Registrieren**
3. Ein Overlay-Dialog für die Registrierung öffnet sich, 
   siehe [Use Case A03.RO](UseCase-A03.RO-GastRegistrierungOverlay.md) 
4. zu Schritt 6 in Main Flow



## Quellen / Autoren 

* Hauptautor Erika
* Interview mit Herrn Mustermann vom 11.11.1111
* Im Interview nichts zur Registrierung, daher Erweiterung 1a

## Notizen / Anmerkungen

* Infos zum Gitlab-Markdown: https://github.com/gitlabhq/gitlabhq/blob/master/doc/markdown/markdown.md#tables
