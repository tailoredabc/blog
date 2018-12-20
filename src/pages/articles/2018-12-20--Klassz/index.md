---
title: "Ez 'klassz'"
date: "2018-12-20T21:05:00.000Z"
layout: post
draft: false
path: "/posts/class/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
  - "Class"
description: "Osztályok"
---

Emlékszel amikor beszéltünk a programozásban a "vallási" háborúkról? 

Ez talán az egyik legnagyobb manapság: OOP vs FP azaz: Objektum orientált és Funkcionális programozás.

Röviden bemutatom, hogy melyik mit takar (persze ennél sokkal többet, de hogy a különbséget szemléltethessem):

```javascript
const szemely = (nev, felnott, fogyasztottDolgok) => ({nev, felnott, fogyasztottDolgok});
const eves = (szemely, etel) => szemely(szemely.nev, szemely.felnott, [...szemely.fogyasztottDolgok, etel]);
const ivas = (szemely, ital) => szemely(szemely.nev, szemely.felnott, [...szemely.fogyasztottDolgok, ital]);
const fogyasztas = (szemely, fogyasztando, fogyasztasFn) => fogyasztasFn(szemely, fogyasztando);

const nemEvettSemmit = [];
const nemFelnott = false;
let pistike = szemely('Pistike', nemFelnott, nemEvettSemmit);

const etel = 'Paprikaskrumpli';
pistike = fogyasztas(pistike, etel, eves);

const ital = 'Rostos narancsle';
pistike = fogyasztas(pistike, ital, ivas);
```

A fenti a funkcionális programozásra egy példa, amiről megismerhetjük:
* Minden művelet egy függvény, és minden adat object
* A függvények más függvényeket is kaphatnak paramétereknek
* A függvények nem okoznak változást a rajtuk kívül eső kódban

Néhány kiegészítés a kódrészlethez:
```javascript
const szemely = (nev, fogyasztottDolgok) => ({nev, fogyasztottDolgok});
```

* A `{nev, fogyasztottDolgok}` egyenértékű azzal, hogy `{nev: nev, fogyasztottDolgok: fogyasztottDolgok}`.
Ha egy object mezőnevével már van egy változónk, vagy paraméterünk, akkor használhatjuk a fenti rövidítést 
(a mezőnév például `nev` ahogyan a paraméter is `nev`)
* A zárójelek `({nev, fogyasztottDolgok})` pedig azért kellenek, hogy tudassuk a függvény egy object-et fog visszaadni.
Ha csak annyit írnánk, hogy `(nev, fogyasztottDolgok) => {nev, fogyasztottDolgok}`, akkor aki futtatja, vagy fordítja, a kódot
ezt úgy értelmezné, hogy van egy függvényünk, amiben az áll, hogy `nev, fogyasztottDolgok`. Ez nem jelent sokat, és nem is 
ezt a viselkedést szeretnénk. Ha azt szeretnénk kifejezni, hogy `return {nev: nev, fogyasztottDolgok: fogyasztottDolgok};`, akkor
a fenti írásmódot használjuk. 

```javascript
[...szemely.fogyasztottDolgok, etel]
```

Ezt a három pontot többféleképp nevezik, pl: rest, spread vagy destructuring operator.

Ez gyakorlatilag arra szolgál, hogy "kicsomagoljunk dolgokat", mint az alábbi példában:

```javascript
const szamok = [1, 2, 3];
console.log(szamok); // [1, 2, 3];

console.log(...szamok); // 1, 2, 3
```

Mikor lehet ez hasznos? A funkcionális programozás során mindenképp, ugyanis az egyik
kitétele annak, hogy megfeleljünk ennek a módszertannak az, hogy 
> A függvények nem okoznak változást a rajtuk kívül eső kódban

Ha van egy tömbünk, és szeretnék egy elemet hozzáadni, így tehetjük meg:
```javascript
szamok.push(4);
```

Ezzel lett egy új elem a tömbben. Abban, ami már eddig is megvolt, tehát megváltoztattuk azt.
A fenti szabályt úgy lehet ellenőrizni legkönnyebben, hogy ha egy adott függvényt, ugyanazokkal a paraméterekkel
_n_ alkalommal meghívunk, akkor _n_ alkalommal ugyanazt az eredményt kell visszakapjuk, (mellékhatások nélkül).

```javascript
const szamok = [];

function elemFelvetele(tomb, elem) {
  tomb.push(elem);
  
  return tomb;
}

for (let i = 0; i < 10; i++) {
  const ujSzamok = elemFelvetele(szamok, 1);
  console.log(ujSzamok);
}
```

Az utolsó alkalommal ez már egy 10 elemű tömb lesz, tele egyesekkel (ezt a függvényt hívhatnám úgy is, hogy "a középiskolai ellenőrzőm").
Tehát ez nem jó módszer, hogy megőrizzük az úgynevezett "immutability"-t.

Próbáljunk írni egy "pure function"-t, ami megfelel annak, hogy:
* Nem módosítja a tömböt (nincs mellékhatása)
* Ugyanazokkal a paraméterekkel meghívva, mindig ugyanazt az eredményt fogja visszaadni.

[Példa](embedded-codesandbox://pure-function?previewwindow=tests)

Akkor nézzük meg az objektum orientált emberek hogyan gondolkoznak erről.

Először is, van egy fontos dolog, amit úgy hívnak, hogy osztály. Ez arra szolgál, 
hogy valamilyen adatot, és a hozzá tartozó viselkedést összekösse.

A fenti evés-ivás így nézne ki OOP módszerekkel modellezve:

```javascript
class Szemely {
  constructor(nev, felnott, fogyasztottDolgok) {
    this.nev = nev;
    this.felnott = felnott;
    this.fogyasztottDolgok = fogyasztottDolgok;
  }
  
  eves(etel) {
    this.fogyasztottDolgok.push(etel);
  }
  
  ivas(ital) {
    this.fogyasztottDolgok.push(ital);
  }
}

class Gyerek extends Szemely {
  constructor(nev, fogyasztottDolgok) {
    const nemFelnott = false;
    super(nev, nemFelnott, fogyasztottDolgok);
  }
}

const pistike = new Gyerek('Pistike', []);

const etel = 'Pacal';
pistike.eves(etel);

const ital = 'Paradicsomle';
pistike.ivas(ital);
```

A `new Gyerek(...)` létrehoz egy új _példányt_ a gyerek osztályból, a megadott paraméterekkel.

Ez egy nagyon leegyszerűsített példája az OOP-nek:
* Nem zavarja, ha változtatunk valamit egy adott példányban, sem a többi példányra, sem az osztályra nincs hatással
* Az, hogy `class Gyerek extends Szemely` azt jelenti, hogy a Gyerek a Szemely osztályból
_öröklődik_, tehát mindent tud, amit egy személy, de eltérhetünk, vagy kiegészíthetjük a tudását,
anélkül, hogy az _ősosztályt_ (Szemely) ezzel megváltoztatnánk.
    * Amint látod, a `Gyerek` osztályhoz nem is kell megadnod, hogy felnőttről van-e szó, vagy sem,
    mert ezt beépítettük az osztályba.

Még adós vagyok némi magyarázattal, például:
* Mi az, hogy `constructor`?

A `constructor` azt jelenti, hogy hogyan kell példányosítani egy adott osztályt.
Ide nem illik nagyon túl bonyolult dolgokat tenni, ami a példában van, az egy általános
dolog, hogy felépíthessük az osztály tulajdonságait (property-nek hívjuk őket).

* Mi az, hogy `this`?

A `this` egy referencia az adott példányra. De várjunk csak, hiszen, amikor az osztályt
kódoljuk le, szó sincs semmiféle példányról! Ez igaz, viszont itt még csak leírjuk a működést,
és nem hívjuk meg a _metódusait_ (emlékszünk? Egy olyan függvény, ami egy osztályon belül lakik).
_Amikor_ meghívjuk a metódust, ő tudni fogja, hogy a `this` azt jelenti neki "a példány, aminek tagja vagyok".

* Mi az, hogy `super`?

Ezt öröklődésnél használjuk, lényegében annyit tesz, hogyha az ősosztálynak, és a származtatott (derived) osztálynak van egy ugyanolyan
metódusa (ide értve a `constructor`-t is), akkor ezzel meg tudjuk hívni az ősosztály metódusát, a származtatottéból.

Ez egy kicsit bonyolult lett, itt egy példa is erre:

```javascript
class AngolNyelvu {
  koszones() {
    console.log('Good Morning!');
  }
}

class Ausztral extends AngolNyelvu {
  koszones(){
    super.koszones();
    console.log('Evening!')
  }
}

const ausztral = new Ausztral();
ausztral.koszones();

// Good Morning!
// Evening!
```

Az öröklődés nagyon hasznos eszköz, de mint mindent, nagyon könnyű rosszul használni,
ami olyan kódhoz vezethet, amit nehéz, vagy lehetetlen bővíteni egy idő után.

Néhány dolgot érdemes még itt megemlíteni: egy osztályon belül létezik egy 
úgynevezett "láthatóság".

Például (ez javascript-ben valószínűleg nem fog működni, de ez egy általános velejárója az OOP-nek):

```javascript
class AngolNyelvu {
  public koszones() {
    console.log('Good Morning!');
  }
}
```

Ez azt jelenti, hogy akármelyik példányon meghívhatjuk ezt a metódust (akkor is, ha az örököl ebből az osztályból).
* Példányon: `new AngolNyelvu().koszones();` - ez mintha "kívülről" látható lenne
* Örökölve: `super.koszones();` - ez pedig "belülről" látható

Ha a `public` szót kicseréljük, akkor a következőképp változik a dolog:

|        | Példányon hívható? | Örökölt osztályon hívható?  |
| ------------- |:-------------:| -----:|
| `public`      | ✅ | ✅ |
| `protected`      | ❌ |   ✅ |
| `private`      | ❌ | ❌ |

Van azonban még egy dimenziója ezeknek a kulcsszavaknak:
`static` és `abstract`.

A `static` azt jelenti, hogy annyira statikus a metódus, hogy nincs szüksége a példányra hozzá.

```javascript
class AngolNyelvu {
  public static koszones() {
    console.log('Good Morning!');
  }
}
```

Ahogy látjuk, ez a metódus remek példája ennek. Ha azonban azt mondanánk, hogy

```javascript
class AngolNyelvu {
  private nev = 'John';
  
  public koszones() {
    console.log(`Good Morning ${this.nev}!`);
  }
}
```
akkor már nem mondhatnánk statikusnak.

A másik pedig ugye az `abstract`. Ez talán egyszerűbb:

```javascript
class AngolNyelvu {
  abstract koszones(nev)
}
```

Valami hiányzik, nem? Méghozza az, hogy mit is csinál a köszönés. Pont ez az `abstract`
lényege, annyit mond, hogy "mindenkinek aki ebből az osztályból örököl, kell, hogy tudjon köszönni, de hogy hogy, az nem érdekel".

Hogy ez mire jó pontosan, azt később kivesézzük.
