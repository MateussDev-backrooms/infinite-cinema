const fs = require('fs');

// * Default options
let options = {
    length: 1,
    genre: 'action',
    profanity: true
}

// * SCRIPT DATA

//dynamic data
let scenes = [] //this will get stringified
let plot_points = []
let characters = []
let setting = {
    country: '', //any set country or 'world' to make anything work
    style: '', //1990s, Modern day, Wild west, Sci-fi, Steampunk, Post-apocalyptic
    color_grading: '' //Vivid, De-saturated, Grim, Gritty, Vibrant
}

//very dynamic
let memory_database = []

//static loaded data
let _names = []
let _surnames = []

//scenarios
let _all_scenarios = {}
let _dlg_scenarios = []
let _cho_scenarios = []
let _snd_scenarios = []
let _env_scenarios = []

//direct data
const _countries = [
    'usa',
    'england',
    'mexico',
    'spain',
    'italy',
    'france',
    'russia',
    'india',
    'china',
    'japan',
]
const _styles = [
    'modern_day',
    '1990s',
    'victorian',
    'wild_west',
    'sci_fi',
    'space_sci-fi',
    'post_apocalyptic',
    'steampunk',
]

//check if options exist
console.log('===== Welcome to Infinite Writer! =====')
fs.readFile('options.json', (err, data) => {
    if(err) {
        console.log('! options.json doesnt exist. Creating new one...')
        fs.writeFile('options.json', JSON.stringify(options), (err) => {
            if(err) {
                console.log(err)
            }
            console.log('> using default options.json')
        });
    } else {
        console.log('> modified options.json detected. Parsing data')
        options = JSON.parse(data)
        s_introduction()
    }
})

function s_introduction() {
    console.log('===== Starting Infinite Writer with the settings in options.json... =====')
    console.log(options)
    s_loadStaticData()
}

function s_loadStaticData() {
    console.log('> Parsing names in '+options.genre+' content pack')
    fs.readFile(`content/${options.genre}/names.json`, (err, data) => {
        if (err) console.error(err);
        else {
            _names = JSON.parse(data);
            console.log('> Loaded names')
            console.log('> Parsing surnames in '+options.genre+' content pack')
            fs.readFile(`content/${options.genre}/surnames.json`, (err, data) => {
                if (err) console.error(err);
                else {
                    _surnames = JSON.parse(data);
                    console.log('> Loaded surnames')
                    console.log('> Parsing dialogue trees in '+options.genre+' content pack')
                    fs.readFile(`content/${options.genre}/scenarios.json`, (err, data) => {
                        if (err) console.error(err);
                        else {
                            _all_scenarios = JSON.parse(data);
                            console.log('> Loaded all scenarios')
                            console.log('> Generating data to begin writing movie')
                            s_intro_datamaker()
                        }
                    })
                }
            })
        }
    })
}

function s_intro_datamaker() {
    //* Setting
    //This is a movie in X X and X


    if(rng_percentage(0.5)) {
        setting.country = rng_arr(_countries)
    } else {
        setting.country = 'world'
    }

    setting.style = rng_arr(_styles);

    //* Characters
    //This is a movie where XXXXX

    if(setting.country != 'world') {
        generateCharacterRngCountry('protagonist', setting.country);
        generateCharacterRngCountry('antagonist', setting.country);
        generateCharacterRngCountry('side-kick', setting.country);
        generateCharacterRngCountry('comedy relief', setting.country);
        generateCharacterRngCountry('mentor', setting.country);
    } else {
        generateCharacterRng('protagonist');
        generateCharacterRng('antagonist');
        generateCharacterRng('side-kick');
        generateCharacterRng('comedy relief');
        generateCharacterRng('mentor');
    }
    console.log('=====>>> MOVIE OVERVIEW <<<=====')
    console.log(setting, characters);


    //General idea
    //This is a movie where X and X do Y to X
    
}

//additional functions

function generateCharacter(name, surname, gender, nationality, type) {
    //just a function that pushes an object full of character data
    characters.push({
        name: name,
        type: type,
        surname: surname,
        gender: gender,
        nation: nationality
    })
    return characters[characters.length-1]
}

function generateCharacterRng(type) {
    //randomly selects names and stuff
    //nationality
    const _nat = rng_arr(_countries)
    // console.log('nation:', _nat)

    const _gend = Math.round(Math.random());

    //name and surname
    const possibleNames = _names.filter((val) => val.nation == _nat && val.gender == _gend)
    const possibleSurnames = _surnames.filter((val) => val.nation == _nat)

    if(possibleNames.length > 0 && possibleSurnames.length > 0) {
        return generateCharacter(rng_arr(possibleNames).name, rng_arr(possibleSurnames).name, _gend, _nat, type);
    } else {
        return {name:'Ben', type: type, surname: 'Dover', gender: 0, nation: 'ur mom'}
    }
}

function generateCharacterRngCountry(type, country) {
    //randomly selects names and stuff
    //nationality
    const _nat = country
    // console.log('nation:', _nat)

    const _gend = Math.round(Math.random());

    //name and surname
    const possibleNames = _names.filter((val) => val.nation == _nat && val.gender == _gend)
    const possibleSurnames = _surnames.filter((val) => val.nation == _nat)

    if(possibleNames.length > 0 && possibleSurnames.length > 0) {
        return generateCharacter(rng_arr(possibleNames).name, rng_arr(possibleSurnames).name, _gend, _nat, type);
    } else {
        return {name:'Ben', type: type, surname: 'Dover', gender: 0, nation: 'ur mom'}
    }
}

//utility functions
function rng_percentage(chance) {
    //returns true chance% of the time (chance <= 1)
    return Math.random() <= chance;
}

function rng_arr(arr) {
    //gives u a random array element
    return arr[Math.floor(Math.random()*(arr.length-1))]
}

function rng_arr_intensity(arr, intensity) {
    //gives you a random element that is close to the intensity (only valid for scenarios)
    let _arr = []
    _arr = arr.filter((val) => {
        val.intensity == intensity
    })
    return rng_arr(_arr)
}

function getCharacterOfType(type) {
    //finds for example the protagonist or whatever
    return characters.find((v) => v.type == type)
}