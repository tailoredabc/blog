---
title: "f(x) = x, emlékszel?"
date: "2018-12-10T21:54:00.000Z"
layout: post
draft: false
path: "/posts/fuggvenyek/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
description: "Függvények"
---

Az előző részben láttuk, hogyan lehet kiiratni valamit: 
```javascript
console.log('valami');
```

Ebben a fejezetben egy kicsit közelebbről megismerkedünk a függvényekkel.
A fenti példában egyelőre ne foglalkozzunk a `console` résszel és a ponttal, ami marad az:

```javascript
log('valami');
```

Mi az a `log`? Leegyszerűsítve egy függvény (angolul `function`). Legegyszerűbben pedig azt mondhatjuk, hogy egy függvény 0 és *n* közötti bemenetet kaphat, végrehajt egy, vagy több utasítást, és visszaadhat egy értéket (csak egyet, vagy semmit).

**Mire jó egy függvény?**

Nézzünk meg egy olyan példát, ami kicsit könnyebben érthető.

Ha azt írjuk, hogy 

```javascript
var eredmeny = 1 + 2;
```
akkor az `eredmeny` értékét kiiratva megkapjuk, hogy `3`.

Ez egyszerű, de nem elég egyszerű ahhoz, hogy könnyen újra felhasználható legyen. Jobban tennénk, ha valahova beküldenénk két számot, és megkapnánk az eredményét.

Ez egy remek alkalom arra, hogy írjunk egy függvényt.

```javascript
function osszead(a, b) {
  return a + b;
}

var eredmeny = osszead(1, 2);
``` 

Szedjük darabokra:
* `function` - ez a kulcsszó, aminek segítségével deklarálhatunk/leírhatunk egy függvényt.
* `osszead` - ez a név amit adunk a függvénynek, később ezzel a névvel tudjuk hívni ezt a függvényt
* `(a, b)` - ezek a *paraméterek*. A zárójelek közé írva adhatunk meg bármennyi paramétert (ajánlott 0 és 2 közé szorítani a számukat, de erről később).
Mire jók ezek? Ezek a "bemenetek" a függvénybe. Ebben a példában a függvényt nem érdekli, hogy mi az az 1, és a 2, vagy hogy honnan jönnek ezek az értékek. Elég annyit tudnia, hogy neki a beérkező adatokkal kell dolgoznia.
* `{...}` - ezek jelentek a függvény belsejének határait. Leegyszerűsítve: ezek közé kerül a kód.
* `return` - ez is egy kulcsszó, azt jelenti, hogy a függvény ezt az értéket adja vissza. Kinek? Ahol hívják a függvényt, egy változóban le lehet tárolni ezt a *visszatérési értéket*. A példában amit a függvény visszaad, az `a + b`. Ami fontos, hogy a `return` után bármit is írunk, azt a kódot soha senki nem fogja végrehajtani. A `return` visszatér oda, ahol hívtuk a függvényt, és onnan folytatja a kód futtatását. 
* `osszead(1, 2)` - meghívjuk az `osszead` nevű függvényt, a paramétereknek pedig az `1`-et, és `2`-őt adjuk meg (így az `1 = a` és a `2 = b` - ahol `a` és `b` a paraméterek, amiket meghatároztunk a függvény leírásában). Az eredmény pedig `3`, ahogy azt gondoltuk.

##### Érdekesség

A fentinek van egy alternatív módja is (ezen a ponton ez tényleg csak érdekesség).
Ezeket többféleképpen hívják a különböző programnyelvekben, például: `lambda` vagy `arrow function`

Ha átültetjük a fenti példát, akkor így néz ki:

```javascript
const osszead = (a, b) => a + b;
``` 

Ami itt történik az:
* Elhagyhatjuk a `function` kulcsszót
* a `=>` jelöli a visszatérési értéket
* ami a nyíl után jön, az pedig maga amit a függvény visszaad.

Ez most nem is érdemel több figyelmet, később részletesebben kitérünk erre.

#### Összefoglalva

A függvény hasznos eszköz, ha arra van szükségünk, hogy
* Egy ismétlődő feladatot ne kelljen újra és újra megírnunk
* Egy bizonyos utasítás sorozatot névvel lássunk el, hogy könnyebben lehessen érteni.
Például ha azt látjuk, hogy `return n % 2 === 0` elsőre nem sokat mond (pláne így az elején), de ha ezt egy függvénybe zárjuk: `function parosSzam(szam) {...}` akkor már van is egy jó tippünk, hogy mire való ez a kód.

Mindig érdemes figyelni arra, hogy
* a függvény neve alapján könnyen kitalálhassuk mi lesz az eredménye.
* minél rövidebb legyen egy függvény, így valószínűleg csak egy célt fog szolgálni (és valószínűleg nem lesznek mellékhatásai - erről később)
* lehetőleg 0 és 2 közé tegyük paraméterei számát. Ez segít észben tartani a dolgokat, amikor vizsgáljuk mit is csinál valójában a függvény.

Lassan már lesz annyi tudásunk, hogy írjunk egy egyszerű, de életszerű programot, hurrá!
Legközelebb azokat fogjuk vizsgálni, hogy hogyan tudjuk irányítani egy program menetét.
