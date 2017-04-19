require( 'babel-core/register' );

const Code = require('code');   // assertion library
const Lab = require('lab');
const EntryModel = require('../../../src/models/entry');

const Server = require('../../../server');

const lab = exports.lab = Lab.script();

let id_entry;
const entry_payload = {
    'url': 'http://www.transparency.org/whatwedo/publication/bridging_the_gaps_enhancing_the_effectiveness_of_afghanistans_anti_corrupti',
    'title': 'Bridging the gaps: enhancing the effectiveness of Afghanistan’s anti-corruption agencies',
    'topic': 'Afghanistan',
    'date': '13 April 2017',
    'img': 'http://www.transparency.org/images/uploads/publication/Screen_Shot_2017-04-12_at_18.07.45.png',
    'excerpt': 'The future of Afghanistan as a viable democratic state, capable of providing security and a strong foundation for its people to prosper, is undermined by the widespread, systemic presence of corruption. Although the immediate prospects for peace in the country remain unclear, what is certain is that long-term stability cannot be secured unless a sustained effort is made to tackle corruption. Experience from post-conflict countries around the world shows that widespread corruption undermines the authority of the state and its institutions and provides fertile ground for criminal networks to develop and insurgents to operate. Corruption also deprives the poor and vulnerable of essential services and limits their access to justice. By weakening the bonds of trust between citizens and the state, it heightens the risk of conflict re-emerging.',
    'download': 'http://files.transparency.org/content/download/2132/13540/file/2017_Afghanistan_anticorruption_report_EN.pdf',
    'translations': {},
    'territories': [
        'Afghanistan'
    ],
    'regions': [
        'Europe and Central Asia'
    ],
    'languages': [
        'English'
    ],
    'topics': [
        'Accountability',
        'Governance',
        'Politics and government',
        'Poverty and development',
        'Transparency International'
    ],
    'tags': [
        'Afghanistan',
        'Afghanistan governance'
    ]
};

lab.experiment('Get entry route', () => {

    lab.before((done) => {

        const entry = new EntryModel(entry_payload); // Call save methods to save data into database
        //Fetch all data from mongodb User Collection


        entry.save((err, data) => {

            if (err) {
                console.log(err);
            }

            // If the user is saved successfully, issue a JWT
            id_entry = data._id;
            done();

        });
    });

    //Success case
    lab.test('test get one entry', (done) => {

        const options = {
            method: 'GET',
            url: '/entries/' + id_entry
        };

        Server.inject(options, (response, error) => {

            Code.expect(response.statusCode).to.equal(200);

            done();

        });

    });

    lab.after((done) => {

        //Fetch all data from mongodb User Collection
        EntryModel.findOneAndRemove({ _id: id_entry }, (error, data) => {

            if (error) {
                console.log(error);
            }
            done();
        });
    });

});
