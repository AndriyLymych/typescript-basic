// #task
// Клас людина:
//     поля:
//         вага,зріст
// Клас депутат(наслідується від людини):
// поля:
//     прізвище,ім'я,вік,хабарник?,розмі хабаря
// методи:
//     дати хабаря(зробити відповідні перевірки...
// якщо депутат не хабарник то щоб він відмовився,
//     або ж якщо сума хабаря надто велика то щоб він вагався
// чи брати чи ні)
// Клас фракція
// поля:
//     список депутатів
// методи:
//     додати депутата (вводимо з клави)
// видалити депутата(теж з клави)
// видалити всіх негідників які брали хабаря
// вивести найбільшого хабарника
// вивести всіх депутатів
// видалити всіх депутатів
// вивести загальну суму хабарів для фракції
// клас Верховна рада
// поля:
//     мапа фракцій
// методи:
//     додати\видалити фракцію
// вивести всі фракції
// вивести конкретну фракцію
// додати\видалити депутата з фракції
// вивести всіх хабарників фракції
// вивести найбільшого хабарника у фрації
// вивести всіх депутатів фракції
//
// в майні зробити через switch меню
//     1 - Верховна рада
//         2 - Фракція
//         3 - Депутат

class Human {

    constructor(
        public weight: number,
        public height: number
    ) {

    }
}

class Delegate extends Human {

    constructor(
        public weight: number,
        public height: number,
        public name: string,
        public surname: string,
        public bribeTaker?: boolean,
        public bribe?: number
    ) {
        super(weight, height)
    }

    public giveBribe(): string {
        if (this.bribeTaker && this.bribe > 50000) {
            return `i don't know...${this.bribe} is a very big sum...`
        } else if (this.bribeTaker) {
            return `i will give this ${this.bribe}$`
        } else if (!this.bribeTaker && this.bribe) {
            return `get out from here with your ${this.bribe}$`
        } else if (!this.bribeTaker) {
            return 'i am not a bribe-taker, Mr!'
        }
    }

}

let Bolbut = new Delegate(87, 180, 'Oleh', 'Bolbut', true, 40000);
let Demko = new Delegate(90, 187, 'Ivan', 'Demko', false, 70000);
let Ivash = new Delegate(65, 168, 'Bogdan', 'Ivash');
let Pakulets = new Delegate(70, 165, 'Natalya', 'Pakulets', true, 800000);
let Styranka = new Delegate(55, 164, 'Nadia', 'Styranka', false);
let Ferendiuk = new Delegate(105, 188, 'Roman', 'Ferendiuk', false, 50000);
let Vozivoda = new Delegate(65, 170, 'Pavlo', 'Vozivoda', true, 2000);
let Bombur = new Delegate(122, 189, 'Dmytro', 'Bombur', true, 120000);
let Perun = new Delegate(119, 178, 'Volodymyr', 'Perun', true, 55000);

let delegates: Array<Delegate> = [Bolbut, Demko, Ivash, Pakulets, Styranka, Ferendiuk, Vozivoda, Bombur, Perun];

// console.log(Bolbut.giveBribe());
// console.log(Demko.giveBribe());
// console.log(Ivash.giveBribe());

class Faction {

    constructor(
        public name: string,
        public members: Array<Delegate>
    ) {

    }

    public addDelegate(weight: number, height: number, name: string, surname: string, bribeTaker?: boolean, bribe?: number) {
        let newDelegate = new Delegate(weight, height, name, surname, bribeTaker, bribe);
        this.members.push(newDelegate);
        delegates.push(newDelegate);


    }


    public removeDelegate(surname: string) {
        this.members.forEach(value => {
            if (value.surname === surname) {
                // @ts-ignore
                this.members.splice(value, 1)
            }
        })
    }

    public removeBribeTakers() {
        for (let i = 0; i < this.members.length; i++) {

            if (this.members[i].bribeTaker) {
                // @ts-ignore
                this.members.splice(i, 2)
            }

        }
    }

    public biggestBribeTaker() {

        return this.members.sort((a, b) => {
            if (a.bribe < b.bribe) {
                return 1
            } else if (a.bribe > b.bribe) {
                return -1
            }
        }).filter((value) => {
            return value.bribeTaker
        }).slice(0, 1)

    }

    public allDelegates() {
        console.log(`Party ${this.name} has such members:`);
        this.members.forEach(value => {
            console.log(`${value.name} ${value.surname} `)
        })
    }

    public removeAllDelegates() {

        this.members.map((value, index, array) => {
            // @ts-ignore
            array.splice(value)
        })

    }

    public bribeSum() {
        // @ts-ignore
        let filtered = this.members.filter(value => {
            if (value.bribeTaker) {
                return value
            }
        });

        // @ts-ignore
        return filtered.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.bribe
        }, 0);

    }
}

let ES = new Faction('ES', [Pakulets, Styranka, Ferendiuk]);
let Voice = new Faction('Voice', [Vozivoda, Perun, Demko]);
let PeopleServant = new Faction('PeopleServant', [Bolbut, Ivash, Bombur]);
// Voice.addDelegate(89, 79, 'Ivan', 'Ivanov', true, 25000);

// console.log(Voice);

console.log('*************');

// Voice.removeDelegate('Vozivoda');
//
// PeopleServant.removeDelegate('Bolbut');
// console.log(PeopleServant);
// console.log(Voice);
// PeopleServant.removeBribeTakers();
// Voice.removeBribeTakers();
// ES.removeBribeTakers();
//
// Voice.removeBribeTakers();
// console.log(Voice);

//
// console.log(Voice.biggestBribeTaker());

// Voice.allDelegates();
// ES.allDelegates();
//
// Voice.removeAllDelegates();
// console.log(Voice);
// console.log(PeopleServant.bribeSum());

class VerkhovnaRada {


    constructor(
        public factionMap: Array<Faction>,
    ) {

    }

    public addFaction(nameFaction: string, members: Array<Faction>, weight: number, height: number, name: string, surname: string, bribeTaker?: boolean, bribe?) {
        this.factionMap.push(new Faction(nameFaction, [new Delegate(weight, height, name, surname, bribeTaker, bribe)]))
    }

    public removeFaction(name: string) {
        this.factionMap.forEach(value => {
            if (value.name === name) {
                // @ts-ignore
                this.factionMap.splice(value, 1)
            }
        })
    }

    public showAllFactions() {
        for (let i = 0; i < this.factionMap.length; i++) {
            console.log(this.factionMap[i].name);

        }
    }

    public showSomeFaction(faction: string) {

        for (let i = 0; i < this.factionMap.length; i++) {

            if (this.factionMap[i].name === faction) {

                console.log(this.factionMap[i]);

            }

        }

    }

    public addFactionDelegate(faction: string, weight: number, height: number, name: string, surname: string, bribeTaker?: boolean, bribe?: number) {
        this.factionMap.forEach(value => {
            if (value.name === faction) {
                value.members.push(new Delegate(weight, height, name, surname, bribeTaker, bribe))
            }
        })
    }

    public removeFactionDelegate(faction: string, surname: string) {
        this.factionMap.forEach(value => {
            if (value.name === faction) {
                value.members.forEach(value1 => {
                    if (value1.surname === surname) {
                        // @ts-ignore
                        value.members.splice(value1, 1);
                    }
                })
            }
        })
    }

    public showFactionBribeTakers(faction: string) {
        this.factionMap.forEach(value => {
            if (value.name === faction) {
                value.members.forEach(value1 => {
                    if (value1.bribeTaker) {
                        console.log(value1);
                    }
                })
            }
        })

    }

    public biggestFactionBribeTaker(faction: string) {
        return this.factionMap.map(value => {
            if (value.name === faction) {
                return value.biggestBribeTaker().slice(0, 1)
            }
        })
    }



    public showAllFactionsDelegates() {
        this.factionMap.forEach(value => {
            console.log(value.name + ':');
            value.members.forEach(value1 => {
                console.log(value1.name + ' ' + value1.surname);
            })
        })
    }


}

let verkhovnaRada = new VerkhovnaRada([ES, PeopleServant, Voice]);
verkhovnaRada.addFaction('Freedom', [], 98, 190, 'Petro', 'Oleshkovets', true, 87000);
// verkhovnaRada.factionMap.forEach(value => {
//     console.log(value.name + ' ' + value.members);
// })

// verkhovnaRada.removeFaction('Voice');

// verkhovnaRada.showAllFactions();

// verkhovnaRada.showSomeFaction('Voice');

// verkhovnaRada.addFactionDelegate('ES', 112, 198, 'Petro', 'Mykha', true, 12000);

// verkhovnaRada.removeFactionDelegate('ES','Pakulets');

// verkhovnaRada.showSomeFaction('ES');

// verkhovnaRada.showFactionBribeTakers('PeopleServant');

// console.log(verkhovnaRada.biggestFactionBribeTaker('ES'));

// verkhovnaRada.showAllFactionsDelegates();

let menu: number = 3;

let rada: number = 2;
let fraction: number = 3;
let deputy: number = 1;

switch (menu) {
    case 1:
        console.log('Verkhovna Rada:');
        switch (rada) {
            case 1:
                verkhovnaRada.showAllFactions();
                break;
            case 2:
                verkhovnaRada.showAllFactionsDelegates();
                break
        }
        break;
    case 2:
        console.log('Fraction:');
        switch (fraction) {
            case 1:
                console.log('ES: ' + ES.bribeSum());
                break;
            case 2:
                console.log('PeopleServant: ' + PeopleServant.bribeSum());
                break;
            case 3:
                console.log('Voice: ' + Voice.bribeSum());
        }
        break;
    case 3:
        console.log('Deputies:');
        switch (deputy) {
            case 1:
                console.log(delegates);
                break
        }
        break
}