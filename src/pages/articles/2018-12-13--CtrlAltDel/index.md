---
title: "Tedd ezt, tedd azt!"
date: "2018-12-13T11:54:00.000Z"
layout: post
draft: false
path: "/posts/control-flow/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
description: "Hogyan irányítsuk a program menetét?"
---

Szóval, mostmár tudjuk mire jó egy változó, és hogyan írjunk függvényt. 
Mi történik akkor, ha egy kicsit bonyolultabb dolgot szeretnénk csinálni?

## Logikai elágazások
Egy program menetében lehetnek elágazások, bizonyos feltételek alapján.

Összehasonlításhoz használt operátorok:
* `==` két érték egyenlő-e (pl: `'1'` és `1`)
* `===` két érték, és a típusuk egyenlő-e (a fenti szigorúbb változata, pl `1` és `1`)
* `!=` két érték különböző-e (pl `1` és `2`)
* `!==` két érték, és a típusuk különböző-e (pl `1` és `'2'`)
* `<` vagy `<=` "kisebb", vagy "kisebb vagy egyenlő"
* `>` vagy `>=` "nagyobb", vagy "nagyobb és egyenlő"

### Ha - vagy ha - egyébként
Ez az egyik leggyakrabban használt elágazási forma

[Példa](embedded-codesandbox://if-else)

Nézzük, mit jelent a fenti kód.

* `if(...)` azt jelenti: "ha a zárójelben levő dolog igaz, akkor ..."
* `else if (...)`: "ha az előző feltétel hamis, de ez igaz, akkor ..."
* `else`: "ha az összes többi feltétel hamis, akkor (és csak akkor) ..."
* egy `if` és egy `else`, viszont akárhány `else if` szerepelhet egymás után

A zárójelekben pedig:
* `ma === 'Hétfő'` így ellenőrizhetjük, hogy a ma értéke a "Hétfő" karakterlánc-e. 
A javascript egy különös nyelv ebben a tekintetben. Általában két egyenlőségjel jelenti az ellenőrzést (egy az értékadást), viszont ebben a nyelvben három egyenlőség jellel teszteljük az állítást. Az indok az, hogy így teszteljük a két érték típusát is (erről bővebben később), például `'1'` nem egyenlő `1`-el (mert az egyik egy szöveg, a másik pedig egy szám... később mindent elmagyarázok)
* `(ma === 'Hétfő' && kellDolgozni === false || ma === 'Péntek')`
    * Ez egy kicsit összetettebb, szóval:
    * Az első állítás ugyanaz, mint korábban, "ha ma hétfő van"
    * A `&&` egy és kapcsolatot jelent, szóval "ha ma hétfő van és nem kell ma dolgozni". 
        * Ha valaminél kíváncsiak vagyunk, hogy igaz-e, akkor `if(valami === true)` vagy egyszerűbben: `if(valami)`
        * Ha arra vagyunk kíváncsiak, hogy hamis-e, akkor `if(valami === false)` vagy egyszerűbben: `if(!valami)`
    * A `||` a vagy kapcsolatot jelenti, "ha ma hétfő van és nem kell dolgozni, vagy ha ma péntek van"
    * A zárójel, amiben van az éssel összekapcsolt állítás arra szolgál, hogy ezek egyszerre értékelődjenek ki. 
     
Fontos lehet megjegyezni, hogy ha az egyszerűbb módot választjuk kiértékelésnél, a 0 és az üres karakterlánc (`""`) hamisként értékelődik ki.


### Bizonyos esetekben
Ha túl sok `if else`-et készülünk írni, hasznos lehet ezt ismerni

[Példa](embedded-codesandbox://switch)

* `switch(ertek)` azt jelenti, hogy a zárójelben szereplő változó értéke alapján fogunk eseteket felvázolni
* `case 'Hétfő'` ez ugyanaz, mintha azt írnánk egy `if`-ben, hogy `ma === 'Hétfő'`
Ez után jöhet a kód, amit szeretnénk végrehajtani, ha ez az ág igaz, a végén pedig egy `break;` parancssal jelezzük, hogy a többi ágat nem szeretnénk vizsgálni és esetlegesen végrehajtani.
* `default` ez ugyanaz, mint az `else`. Ha minden más ág hamis, akkor ezt szeretnénk végrehajtani.


## Ismétlések
Van olyan, hogy többször szeretnénk valamit megtenni, ebben segítenek az úgynevezett "loop"-ok

Tegyük fel, hogy hajnalban csörög a telefon. 3 óra van, és a főnök azt kéri, hogy egy órán belül kell neki egy program, ami kiírja egyesével a számokat egytől 3600-ig.

Jó munkavállalók vagyunk, ezért le is ülünk az asztalhoz, és elkezdjük írni, hogy

```javascript
console.log(1);
console.log(2);
console.log(3);
...
```

Ekkor ébredünk rá, hogy ha másodpercenként egy sort írunk, akkor is igen csak határidőre fejeznénk be a feladatot. Mit lehet tenni ilyenkor?

Szerencsére eszünkbe jut, hogy használhatunk egy `for loop`-ot, és mehetünk vissza aludni.

### For loop

Tehát ahelyett, hogy egyesével kiírnánk a számokat, a következőt követjük el:

```javascript
for (let i = 1; i <= 3600; i++) {
  console.log(i);
} 
```

Várjunk csak! Mi történt?

* `for` jelöli a ciklus típusát
* `let i = 1` - ilyet már láttunk, igaz? Létrehozunk egy változót, aminek a kezdeti értéke `1`. Innen fog indulni a ciklusunk.
* `i <= 3600` a pontosvesszővel elválasztva, ez a második dolog, amire kíváncsi a ciklusunk. Azt jelenti, hogy _meddig szeretnénk ismételni_ a kódunkat. Amíg ez az állítás igaz, addig fog ismétlődni a kódunk, tehát ebben az esetben amíg le nem futott 3600 alkalommal.
* `i++` ez az utolsó amit megadunk, azt jelenti, hogy minden egyes ciklus végén, növelje az `i` változónk értékét eggyel, így elérünk előbb-utóbb 3600-ig.


Egy pillanat, mi az az `i++`?

Röviden: így növelhetjük az értékét eggyel.

Növelhetjük, vagy csökkenthetjük az értéket eggyel:
* `i++`
* `i--`

Létezik ugyanakkor a következő is:
* `++i`
* `--i`

Nem érdemelnek túl sokat ezen a ponton, de a különbség az közöttük, hogy:

```javascript
let a = 0;
let b = 0;

console.log(a++); // 0
console.log(++b); // 1

console.log(a); // 1
console.log(b); // 1
```

_ az `a++` növeli az értéket, de a régi értéket adja vissza, a `++b` szintén növeli az értéket, de az új értéket is adja vissza.

**Fontos**, hogy a ciklus az egyik legveszélyesebb művelet, olyan szempontból, hogyha itt hibát vétünk, könnyen a végtelenségig ismétlődhet a ciklus. Ez azt jelenti, hogy egyre több és több rendszer erőforrást fog igényelni a programunk, és nem fog válaszolni, hiszen elfoglalt lesz egy dologgal. Félni sosem kell, ezt észre fogjuk venni, és könnyen kijavíthatjuk majd.

### While loop

A fenti példát egy hasonló, de mégis más szerkezetű ismétlődéssel is kifejezhetjük.

```javascript
let i = 1;

while(i <= 3600) {
  console.log(i);
  i++;
}
```

Az eredmény ugyanaz lesz, a különbség a két módszerben leginkább az, hogy:
* `for` = Tedd meg ezt _n_ alkalommal
* `while` = Tedd ezt amíg a feltétel igaz (a példában: `i <= 3600`)

Érdekességként: A `while`-nak van egy különleges fajtája, a `do-while`

```javascript
let i = 1;

do {
  console.log(i);
  i++;
}
while (i <= 3600);
```

A különbség a két `while` között az, hogy az első példában először kiértékeli a feltételt, és utána ismétli a kódot,
a második példában pedig először lefut egy ciklus, majd kiértékeli a feltételt, és utána ismétli tovább a kódot. Ez akkor lehet érdekes, ha szeretnénk az első alkalommal felépíteni bizonyos dolgokat, mielőtt tovább futtatjuk a ciklust.
