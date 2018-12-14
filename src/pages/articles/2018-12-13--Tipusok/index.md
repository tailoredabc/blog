---
title: "Nem az én típusom"
date: "2018-12-13T23:54:00.000Z"
layout: post
draft: false
path: "/posts/tipusok/"
category: "Programozás alapjai"
tags:
  - "Alapok"
  - "Javascript"
description: "Típusok"
---

A programnyelv, amiben a példákat boncolgatjuk egy "dinamikus" programnyelv. 
Ennek az ellentettje a "statikus" nyelv.

## Dinamikus nyelv

Egy dinamikus nyelvben a változók típusai akkor kerülnek ellenőrzésre, amikor a kódot futtatod (runtime).

Így írhatunk ilyen kódot:

```javascript
function osszead(a, b) {
  return a + b;
}

console.log(osszead('1', 2));
```

A fenti kód semmilyen hibát nem jelez, az eredmény pedig mégis `'12'` lesz.

1 + 2 = 12? Ez meg milyen ökörség? Igazából, ha egy kicsit mélyebbre ásunk, már értelmet is nyer ez.

Ha azt írod, hogy `console.log('a' + 'b');` azt kapod, hogy `'ab'`. Ha karakterláncokat adsz össze, akkor egymás után összefűzi őket.
Az előbbi példában is valami hasonló történik. Mivel az első paraméternek nem egy számot adtunk meg, hanem egy `string`-et (ez a "karakterlánc", innentől így fogok hivatkozni rá), 
a programunk megpróbálta kihozni a legtöbbet, és az általa helyesnek ítélt dolgot tette, a második paramétert is stringként kezelte (holott azt számként adtuk meg).

## Statikus nyelv

A statikus nyelvekben a változók típusai már fordítási időben (compile time) ellenőrzésre kerülnek. 

Fordítási idő? Igen, ebben az esetben maga a kód amit írunk, az nem egy az egyben az ami le fog futni, hanem egy fordító (compiler) lefordítja valamire, ami később már futtatható.

Ennek következményeképpen a fenti példa így néz ki (a példában a typescript nyelvet használjuk)

```typescript
function osszead(a: number, b: number): number {
  return a + b;
}

console.log(osszead('1', 2));
                    ^^^ 
```

Egy kis magyarázat:
* `(a: number)` a paraméter neve utáni `: number` azt jelenti, hogy a paraméter típusa egy szám kell, hogy legyen.
* `function osszead(...): number` pedig azt jelenti, hogy a függvény amit visszaad, az egy szám kell, hogy legyen.

Az `'1'`-et hibának is jelöli a fordító: 
> Az '1' nem rendelhető egy szám típusú paraméterhez

Azt a hibát, amit a dinamikus nyelv esetében elkövettünk, itt még azelőtt el tudjuk csípni, hogy azt valaha is elő tudnánk idézni.
Jó, nem? 

Felmerülhet a kérdés, hogy: _"Akkor miért nem használ mindenki statikus nyelveket?"_

* Mert úgy érzik, hogy egy fordítási lépés minden egyes változásnál lassítja a fejlesztést
* Mert más módszerekkel helyettesítik ezt a fajta ellenőrzést
* Mert nem tetszik nekik

Az utolsó talán a legérdekesebb a listából. A programozás világában ezzel együtt kell tudnunk élni.
Sok esetben szinte vallási viták kerekednek olyan dolgokból, amik egy külső szemlélőnek a legjelentéktelenebbek, például:

* A kódban tab-bal, vagy space-szel igazítsuk be a sorokat?
* Milyen programnyelvet használjunk?
* Milyen keretrendszert használjunk?
* Írjunk-e megjegyzéseket a kódba, vagy sem?
* ... és még sorolhatnám

Nagyon fontos, hogy ne essünk ezekbe a hibákba. Minden esetben megvan egy embernek az egyéni preferenciája, és sokszor nem a pró és kontra érvek alapján hoznak döntéseket, hanem az alapján, hogy mihez vannak szokva.

Amivel általában a világon semmi baj nincs. A programozásban rengeteg dolog a kompromisszumokról szól, itt is ez a helyzet.

Szóval, vissza a típusokhoz:

* `string` - ezzel már találkoztunk. Leegyszerűsítve vehetjük "szövegnek" is, de később láthatjuk, hogy ez a karakterlánc tényleg az, amit a név takar (később, bővebben)
* `number` - ez nyelvenként eltérő. Van ahol csak "szám", van ahol megkülönböztetjük, hogy egész szám, tört szám, lebegőpontos szám, stb.
    * Az egész számot általában `integer` néven emlegetik. Ennek több fajtája van, de a típusok kapcsán most nem fogunk részletesen belemenni a bitek világába, majd később.
    * A tört számok lehetnek `float` vagy `double` típusúak is.
* `boolean` - ez az igaz/hamis típus
* `null` - ez egy speciális érték, nagyjából azt jelenti, hogy semmi.
* [`object`](#object)
* [`array`](#array)

Ezek mellett létrehozhatunk saját típusokat is - erről talán _sokkal_ később.

Van azonban néhány elem, ami magyarázat nélkül maradt.

### Object

Ezt a típust vehetjük egy kulcs-érték párnak, például:

```javascript
const szemely = {
  nev: 'Zoli'
};

console.log(szemely.nev); // 'Zoli'
```

* `{}` jelölik a kezdetét, és a végét
* `nev` a "kulcs", ami alapján később hivatkozni tudunk az értékre (ami egy kettőspont után követi a kulcsot).

Az értéket kétféleképpen kapjuk meg, de programnyelvenként eltérő lehet ez is. 
Vagy `szemely.nev` vagy `szemely['nev']`. Utóbbinál figyelni kell arra, hogy a kulcsot stringként használjuk, tehát a `szemely[nev]` hibás (hiányzik a két `'` a `nev` körül).

Ebben az esetben a `nev` a kulcs, az érték pedig `'Zoli'`.
Ez a struktúra sokmindennek az alapja, és rendkívül hasznos is.

Tökéletesen tud modellezni összetett fogalmakat, vagy egyszerűen csak központosítani az összetartozó adatokat, például:

```javascript
const szemely = {
  azonosito: 1,
  nev: 'Zoli',
};

const munkaber = {
  osszeg: 1000,
  penznem: 'EUR',
  utalva: true,
  jogosultSzemely: szemely.azonosito,
};
```

Az object típus rengetegszer fel fog bukkani programozás során, és egyre jobban meg fogunk vele ismerkedni, ahogy szükség lesz rá.

### Gyűjtemények

#### Array

Magyarul tömbnek nevezik, ez egyfajta _gyűjtemény_.

```javascript
const szamok = [1, 3, 3, 2];
```

Az értékeket szögletes zárójelek közé téve, már van is egy tömbünk.
Hogy mihez lehet kezdeni ezzel, azt egy későbbi bejegyzésben kivesézzük.


###### Érdekesség

Néhány nyelvben megkülönböztetik az `array`-t a `list`-től.
Röviden a kettő közötti különbség az, hogy a `list` értékei valami szerint sorba vannak rendezve, 
míg az `array` erre fittyet hány 

#### Set

A `set` abban különbözik a tömbtől, hogy minden eleme csak egyszer fordulhat elő, tehát:

```javascript
const szamok = [1, 3, 3, 2];
const szamSet = new Set(szamok);
```

Ha kiíratjuk a `szamSet` értékét, azt kapjuk, hogy `Set(3) {1, 3, 2}`. 
Ez annyit jelent, hogy a `set` mérete 3 (ennyi eleme van), és kiírja őket kapcsos zárójelekben.

Feltűnhet, hogy ez máshogy néz ki mint a tömb esetében, ez azért van, mert a `set` egy osztály. Erre is kitérünk később

#### Map

Ez pedig a `set` felturbózva. A `map` egy olyan szerkezet, amiben minden eleme rendelkezik egy kulcssal, és egy értékkel (mint az `object`, de mégis más egy kicsit).

```javascript
const szamok = [1, 3, 3, 2];
const szamMap = new Map().set('szamok', szamok);
```

Ha ezután lefuttatjuk a `szamMap.get('szamok');` parancsot, visszakapjuk a tömbünket.

Szándékosan nem mentem bele részletesen a működésükbe, bőven megérdemelnek egy saját fejezetet, és meg is fogják kapni a közeljövőben.
