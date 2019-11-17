//* Imports
const polka  = require('polka'); // Why not Express? Too slow. Why not Fastify? Project too small for it to be of much use. Why not HTTP? Too complicated and can't be arsed.
const wump   = require('wumpfetch');
const config = require('./config.json');

// Listen on port 
const app = polka().listen(config.port);

//* Routes
app.get('/', async (req, res) => res.end('hello world'));

app.get('/lyrics', async (req, res) => {
    let data = await wump(`https://api.ksoft.si/lyrics/search?q=${req.query.input}&limit=1`, { // Upon reading this line, you might be thinking: Oh shit oh fuck, my Linux FOSS privacy is being violated! Don't worry. According to https://api.ksoft.si/terms-and-privacy/, only the IP of the SERVER is logged. All user info passed will be anonymous. Enjoy searching for Justin Bieber lyrics without your family disowning you.
        headers: {
            'Authorization': config.token // If you're a bot dev, you probably already have one. If not, you'll need to do extra things
        }
    }).send();
    res.end(JSON.stringify(data.json())); // Apparently JSON.stringify is needed. Don't ask.
});