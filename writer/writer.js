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

//very dynamic
let memory_database = []

//static loaded data
let _names = []
let _surnames = []
let _dialogue_trees = []

//scenarios
let _dlg_scenarios = []
let _cho_scenarios = []
let _snd_scenarios = []
let _env_scenarios = []

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
                    fs.readFile(`content/${options.genre}/dialogue.json`, (err, data) => {
                        if (err) console.error(err);
                        else {
                            _dialogue_trees = JSON.parse(data);
                            console.log('> Loaded dialogue trees')
                        }
                    })
                }
            })
        }
    })
}

function s_createCharacters() {
    
}

function generateCharacter(name, surname, gender, nationality, type) {
    characters.push({
        name: name,
        type: type,
        surname: surname,
        gender: gender,
        nation: nationality
    })
}