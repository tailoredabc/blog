---
title: "Blackjack"
date: "2018-12-15T14:25:00.000Z"
layout: post
draft: false
path: "/posts/blackjack/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
  - "Array"
description: "Tömbös játék"
---

Ideje egy kicsit jobban beleugrani magába a kódolásba, ennyi száraz dolog után.

A következő példák majdnem teljesen működnek, de neked kell belenyúlni, hogy _jól_ működjenek.

Egy zöld pipa a "tests" fülön fogja jelezni, hogy minden rendben van.

### Kártyázzunk!

Itt is az első probléma a kódunkban. A célunk az, hogy a `kartyalap` függvény visszaadjon egy `object`-et, 
ami tartalmazza a kártya adatait.

Nem szeretnénk engedi viszont azt, hogy bármilyen értéke lehessen egy kártyának, szeretnénk ezt 1 és 10 közé szorítani, minden más esetben pedig egy hibát fogunk "dobni".

Ami újdonság lehet ebben a kódban:

* `export function ...` - az `export` kulcsszó itt csak annyit jelent, hogy egy másik modulból vagy fájlból (ebben az esetben a tesztek) elérhető legyen. Ezekről később bővebben.
* `throw new Error(...)` - `throw` ezzel tudunk valamit "dobni". Egyelőre elég annyit tudni, hogy ha valami hibát szeretnénk jelezni a kódunkban, akkor ezt használjuk, együtt a hibával, 
ami itt a `new Error(...)`. A new "példányosítja" az `Error` osztályt (nem fontos, nem fontos, az osztályoknál vesszük majd, hogy ez mit jelent). Esetlegesen megadhatunk neki egy egyéni hibaüzenetet. 
Általában ez javallott, így könnyebb lesz rájönni, hogy mi a _konkrét_ hiba.


_Tipp: egy jól irányzott `if` megoldja a problémánkat_

[Példa](embedded-codesandbox://blackjack/1?previewwindow=tests)

Remek! Így már lehet egy pakli kártyánk, mert jól működik a függvényünk.

Na most, éppen römizünk, mi vagyunk az osztók (a példák kedvéért)... a társaság már kellemesen ittas ahhoz, 
hogy vadul politizálni kezdjenek.
Kivéve minket, és egy jó barátunkat. Egy összekacsintással jelezzük felé, hogy számíthat ránk,
ma együtt bankot robbantunk - egy kis csalással.

Mivel a paklink egy `array` - azaz a kártyák egy rendezetlen gyűjteménye - így használhatjuk az `array` metódusait.

_Mi az a "metódus" (method)? Ha egy osztályhoz tartozik egy függvény, akkor az az osztály metódusa. Az osztályoknál részletesen megnézzük ezt, most nem fontos_

Először elővesszük a pakli kártyát, és kiválogatjuk belőle a Jolly Joker-t.

Ehhez pont kapóra jön az `array.filter()`!

Ez a függvény nagyon érdekes módon, egy másik függvényt vár paraméternek 🤯

Hogy miért, arra majd kitérünk, most az a fontos, hogy megértsük mi ez, és mit vár.

Szóval az `array.filter()` egy tömb elemeit szűri meg, egy állítás (predicate) ellenőrzésével.

Például, ha van egy virág tömbünk:

```javascript
const viragok = [
  {nev: 'tulipan', viragzik: false},
  {nev: 'rozsa', viragzik: false},
  {nev: 'orchidea', viragzik: true},
];
```

Szeretnénk tudni, hogy melyik virág virágzik, úgyhogy ezt írjuk:

```javascript
const viragzoViragok = viragok.filter(virag => virag.viragzik);
```

Szedjük darabokra a fenti állítást:
* `viragok.filter()` - ahogy látod, a "metódus" jellege miatt, a már létező tömbünkön hívjuk meg 
a `filter`-t.
* `virag => virag.viragzik`
  * Ez egy ún. `arrow-function` (a függvényeknél néztük), ez egyenlő azzal, hogy 
  `function(virag) { return virag.viragzik }`. Ha megfigyeljük, ez (is) annyiban különleges, hogy nincs saját neve. 
  Ezeket a függvényeket általában csak helyeben lehet felhasználni, és `anonymous` függvényeknek hívjuk őket.
  * `virag.viragzik` - ugye beszéltük az `if`-ek kapcsán, ez annyit tesz, `virag.viragzik === true`
  
A fentiek segítségével, próbáljuk meg megírni azt a függvényt, ami kiveszi (kiszűri) a Jokert a pakliból.

_Tipp: A kártyalap mezői: `szin`, `szam` és `ertek`_

[Példa](embedded-codesandbox://blackjack/2?previewwindow=tests)

Eddig minden a terv szerint halad! Tudjuk mi kell ahhoz, hogy a következő kört megnyerjük. Barátunk eltátogja, hogy "kérem a 3 legkisebb lapot".

Egyszerű kérésnek hangzik, de hogy kódoljuk le?

Két dolog is kell hozzá, először is sorba kell rendeznünk hozzá a kártyákat, hogy tudjuk melyek a legkisebbek.

Ehhez a `sort()`-ot fogjuk használni. Ez pont azt csinálja, amit sejteni lehet, sorba rendezi őket.

Mi alapján? Hát amit mondunk neki! Hasonlóan a `filter()`-hez, ez is egy függvényt kap paraméternek.

```javascript
const gyerekek = [
  {'nev': 'Jancsi', eletkor: 5},
  {'nev': 'Feri', eletkor: 3},
  {'nev': 'Pali', eletkor: 9},
];

const sorbaRendezettGyerekek = 
  gyerekek.sort((elozoGyerek, kovetkezoGyerek) => elozoGyerek.eletkor - kovetkezoGyerek.eletkor);
```

Így már tudjuk, hogyan kell sorba rendezni, de valahogy meg kéne találni a legkisebb _3_-at.

Ehhez hasznos lehet a `slice()` - két opcionális paramétere van.
* Ha nem adunk meg semmit, akkor visszaad egy másolatot az eredeti `array`-ből. Dióhéjban ez azért hasznos, ha szeretnénk két hasonló gyűjteményt, anélkül, hogy az egyiket ért módosítások a másikhoz hozzápiszkálnának.
* Ha csak az elsőt adjuk meg, akkor attól az `index`-től kezdve az utolsó elemig visszakapjuk a tömb elemeit.
* Ha mindkét paramétert megadjuk, akkor visszaadja `index`-től `index`-ig az elemeket.

De mi az az `index`?
Egy tömb elemének helyét jelöli. Nagyon fontos megjegyezni, hogy ezen a területen majdnem minden "0-ás indexű".
Ez annyit tesz, hogy `gyerekek[0]` az Jancsi, `gyerekek[2]` pedig Pali. Van ennek történelmi háttere is, de az szorgalmi feladat lesz.

Ha meg szeretnénk tudni, ki az első két gyerek, ezt írjuk:
```javascript
sorbaRendezettGyerekek.slice(0, 2);
```

Mert a 0. elemtől indulunk, egészen a 2. indexig, szóval a 0. és az 1. elem lesz az új tömbben.

Ami egy érdekes, de hasznos tudnivaló, hogy léteznek úgynevezett "chainable" metódusok.

Mivel például a `sort()` visszatérési értéke is egy `array`, ezért ugyanazok a metódusok elérhetőek, tehát csinálhatunk ilyet:

```javascript
const gyerekek.filter(...).sort(...).slice(...);
```

Akkor nincs más hátra, mint megírni a kódot ahhoz, hogy havernak oda tudjuk adni a három legkisebb lapot.

[Példa](embedded-codesandbox://blackjack/3?previewwindow=tests)

Miután _tiszta győzelemmel (🙄)_ besöpörtük a többiek minden vagyonát (akik valószínűleg erre már csak holnap ébrednek rá, mert a folyamatos vesztés nem arra sarkallta őket, hogy _kevesebbet igyanak_), az est fénypontjaként kártyatrükkökkel tervezzük szórakoztatni a többieket.
Persze a játszmákhoz hasonlóan, most is csalni szeretne a cimboránk, és mivel a nyereménye 50%-át nekünk ígérte, az elveinket a kukába dobva már ugrunk is neki a következő kihívásnak.

Az első trükk az lesz, hogy egy adott pakliban szereplő lapok értékének összegét meg tudjuk mondani.

Ehhez használni fogjuk a `reduce()`-t. Hasonlít egy kicsit a `sort()`-ra (de csak egy kicsit).

```javascript
const arucikkek = [
  {termek: 'kefe', ar: 100, penznem: 'Ft'},
  {termek: 'pumpa', ar: 350, penznem: 'Ft'},
  {termek: 'ecset', ar: 500, penznem: 'Ft'},
];

const osszeg = arucikkek.reduce((vegosszeg, termek) => vegosszeg + termek.ar, 0);
```

Nézzük:
* `(vegosszeg, termek)` - ezek a paraméterek. Ami különleges lehet első ránézésre, hogy csak az egyik (`termek`) ami a tömbhöz tartozik, a másik egy "accumulator", egy gyűjtő.
    * A `reduce()` arra való, hogy összegezzünk dolgokat. Az accumulator egy olyan hely, ahova minden egyes iterációban tudunk tárolni egy értéket, és mindig az előző értéket fogja használni hozzá
    
```javascript
const osszeg = arucikkek.reduce((vegosszeg, termek) => vegosszeg + termek.ar, 0);

/*
 Ez haromszor fog lefutni (mert ennyi eleme van a tombnek)
 
 1. vegosszeg = 0-val indul (mert ezt adtuk meg a 3. parameternek), vegul 100 lesz  (mert az elso elem ara 100).
 2. vegosszeg = 100-al indul, vegul 450 lesz (100 + 350)
 3. vegosszeg = 450-el indul, vegul 950 lesz (450 + 500)
*/
```

* A harmadik paraméter csak "0". Ez az accumulator kezdeti értéke.

Ha már így kiveséztük, ideje írni egy kis kódot:

[Példa](embedded-codesandbox://blackjack/4?previewwindow=tests)

Körülnézve látjuk, hogy már csak egy falábú fickó van talpon, a többiek már vagy hazamentek, vagy a padlón alszanak.

Még van egy utolsó trükk a tarsolyunkban, lássunk is hozzá! Ez nem más, mint hogy bármilyen adag kártyát kapva, meg tudja mondani "bűvész" haverunk, hogy milyen színű lapokat tartalmaz.

Ehhez mi peding a `map()`-et fogjuk használni. Ez nem tesz mást, mint egy adott értéket egy másikká alakít át. Leegyszerűsítve persze.

```javascript
const arucikkek = [
  {termek: 'kefe', ar: 100, penznem: 'Ft'},
  {termek: 'pumpa', ar: 350, penznem: 'Ft'},
  {termek: 'ecset', ar: 500, penznem: 'Ft'},
];

const termekNevek = arucikkek.map(arucikk => arucikk.termek);
```

Ideje is nekilátni az utolsó trükkünknek!

[Példa](embedded-codesandbox://blackjack/5?previewwindow=tests)

Ez egy görbe és hosszú estére sikerült, de szerencsére megismertük a legfontosabb metódusait az `array`-nek!
