---
title: Kezdjük az elején
date: "2018-12-01T11:45:00.000Z"
layout: post
draft: false
path: "/posts/kezdjuk-az-elejen/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
description: "Változók"
---

Sok emberen látom, hogy érdekelné a programozás, ezért határoztam el, hogy megpróbálom összeírni az alapvető dolgokat úgy, ahogy én is megértettem volna, amikor elkezdtem foglalkozni vele.

Úgy próbálom meg felépíteni a dolgokat, hogy mindig csak annyival foglalkozzunk, ami éppen szükséges ahhoz, hogy egy adott részt megérts.

A példákban egy "JavaScript" nevű programnyelvet fogok használni, mert:
- Az egyik legkeresettebb manapság
- Könnyű megérteni a példákat (erre majd egy későbbi fejezetben kitérünk)
- Ez az a nyelv, ami a webes alkalmazásokat működteti (és már sok mást is)

Az egyetlen fontos dolog amit ebben a pillanatban tudni érdemes, hogy a "Java" nyelvhez semmi köze a "JavaScriptnek".

Mielőtt belemerülünk, a következőket szükséges előre ismerni:
```javascript
console.log("Üzenet");
```

Ez a parancs (ha megfelelő környezetben futtatod), a parancssorba (vagy éppen ami konzolnak számít neki), kiírja, hogy Üzenet.

A fenti példából kiindulva:

```javascript
var uzenet = "Üzenet";
console.log(uzenet);
```

Ez a program ugyanazt fogja eredményezni, mint amit előtte láttunk.
A különbség az, hogy az "Üzenet" szót egy _változóban_ tároljuk.
- `var` (variable = változó) ez a *kulcsszó** azt jelenti, hogy ami utána jön az a változó neve. Később ezzel a névvel tudunk hivatkozni rá.
- `uzenet` ez a változó neve. Több féle "írásmód" létezik, általában a nyelvtől függ, hogy mi az ajánlás, de saját magunk is eldönthetjük melyiket használjuk. A két legelterjedtebbre egy-egy példa:
    - `camelCase`, például: `aValtozoNeve` - a külön írandó szavakat egybe írjuk, és a nagybetű jelenti az egyes szavak határait.
    - `snake_case`, például: `a_valtozo_neve` - itt a szóközt egyszerűen egy `_` karakter helyettesíti
- az `=` után a változó értéke következik. Ezután, ha a változó nevével hivatkozunk rá, az értékét fogjuk visszakapni (leegyszerűsítve)
- `"Üzenet"` maga az érték. Szövegnél két `"` vagy `'` karakter kell, hogy körbevegye.

\* Mi az a "kulcsszó"? A kulcsszó (keyword vagy reserved word) egy olyan szó, ami az utána következő "dolgot" meghatározza. 
Ebben a példában a `var` az, ami az `uzenet`-et változóvá teszi. Később több példát is hozunk erre.

A változónak több szerepe lehet egy programban, nézzünk meg néhányat ezek közül:
### Segít jelentést adni egy értéknek.

Például tudjuk, mi lesz a kimenetele a következő parancsnak: 
```javascript
console.log(5);
```
 
Hogy _miért_ azt könnyebben megértjük, ha az alábbi kódot látjuk: 
```javascript
var munkanapokSzama = 5;
console.log(munkanapokSzama);
```

### Van, több értéke is lehet, de még nem tudjuk melyik lesz az

```javascript
var munkanapokSzama; // Deklaráljuk (azaz létrehozzuk) a változót, de nem adunk neki értéket.

// ... itt a program eldönti, hogy mi lesz az értéke

munkanapokSzama = 5;
console.log(munkanapokSzama);
``` 

Az alap típusok (ezekről is később bővebben) ebben a nyelvben:
- Szöveg (pontosabban "karakterlánc" - angolul string), pl `"érték"`
- Szám, például `13`
- Igaz/hamis (boolean), két értéket vehet fel: `true` vagy `false`
- `Object` (erről jóval később), de kulcs-érték pár, például: `{osszeg: 26}`

Jöhet az első bonyolítás a "változóhoz": A jelenlegi szabvány szerint amit fent használtunk
(`var` kulcsszó) már nem ajánlott, van helyette két másik kulcsszó:


##### let

A `let` ami korábban a `var` volt, a szó szoros értelmében egy változó.


##### const

A `const` (constant, konstans, állandó) kulcsszó egy olyan változót jelent, ami csak egyszer kaphat értéket.
Ellentmondásos egy kicsit (egy változó, ami nem tud változni?), de hasznos adaléka a nyelvnek.

```javascript
const uzenet = "Üzenet";
uzenet = "Más üzenet";
```

A fenti kódrészlet egy hibát fog jelezni.
Mire jó ez?

Segít olyan kódot írni, ahol a kódnak egy fő feladata van, és nincsenek benne "mellékhatások".
Ezek a mellékhatások sokszor nem kívánt módosításokhoz vezethetnek, vagy hibákat idézhetnek elő.
Mondanom sem kell, hogy ezek a hibák abba a kategóriába tartoznak, amiket nehéz megérteni, és feltárni.

Általános jótanács, hogy ha csak kifejezetten nem számít az ember arra, hogy egy változónak
új értéket kell adnia, akkor mindig a `const` kulcsszóval hozzuk létre azokat.

