require( 'babel-core/register' );

const Code = require('code');   // assertion library
const Lab = require('lab');
const EntryModel = require('../../../src/models/entry');

const Server = require('../../../server');

const lab = exports.lab = Lab.script();

let id_entry1;
let id_entry2;
const entry_payload1 = {
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

const entry_payload2 = {
    'url': 'http://www.transparency.org/whatwedo/publication/sao_paulo_does_corruption_live_next_door',
    'title': 'São Paulo: Does corruption live next door? Shell companies and the real estate sector in the largest city in the Southern Hemisphere',
    'topic': 'Asset recovery',
    'date': '10 April 2017',
    'img': 'http://www.transparency.org/images/uploads/publication/2017_SaoPauloRealEstate_EN_116.jpg',
    'excerpt': 'This report raises red flags about the lack of transparency in property ownership in São Paulo and identifies how real estate worth billions of dollars is owned through companies registered in offshore tax havens. In Brazil, as in many countries around the world, it is possible to hide the beneficial owner of companies that are buying property. The research shows that more than 3,450 real estate titles are owned through 236 companies that are registered in secrecy jurisdictions and tax havens, including in the British Virgin Islands, the US state of Delaware and Uruguay.',
    'download': 'http://files.transparency.org/content/download/2125/13512/file/2017_SaoPauloRealEstate_EN.pdf',
    'translations': {
        'PT': '/whatwedo/publication/sao_paulo_a_corrupcao_mora_ao_lado'
    },
    'territories': [
        'Brazil'
    ],
    'regions': [
        'Americas'
    ],
    'languages': [
        'English'
    ],
    'topics': [
        'Asset recovery',
        'Law enforcement',
        'Politics and government',
        'Private sector'
    ],
    'tags': [
        'Tax havens',
        'Money laundering',
        'Offshore property',
        'Offshore secrecy',
        'Beneficial ownership',
        'São Paulo',
        'Real estate sector',
        'Real estate',
        'secret companies',
        'Real estate agents',
        'Megacities'
    ]
};

lab.experiment('Get all entries route', () => {

    lab.before((done) => {

        const entry1 = new EntryModel(entry_payload1); // Call save methods to save data into database
        //Fetch all data from mongodb User Collection


        entry1.save((err, data1) => {

            if (err) {
                console.log(err);
            }

            // If the user is saved successfully, issue a JWT
            id_entry1 = data1._id;

            const entry2 = new EntryModel(entry_payload2); // Call save methods to save data into database
            //Fetch all data from mongodb User Collection


            entry2.save((err, data2) => {

                if (err) {
                    console.log(err);
                }

                // If the user is saved successfully, issue a JWT
                // console.log(data);
                id_entry2 = data2._id;
                done();

            });

        });


    });

    //Success case
    lab.test('test get all entries', (done) => {

        const options = {
            method: 'GET',
            url: '/entries'
        };

        Server.inject(options, (response, error) => {

            Code.expect(response.statusCode).to.equal(200);
            // Code.expect(response.result.data.length).to.equal(2);
            done();

        });

    });

    lab.after((done) => {

        //Fetch all data from mongodb User Collection
        EntryModel.findOneAndRemove({ _id: id_entry1 }, (error1, data1) => {

            if (error1) {
                console.log(error1);
            }
            //Fetch all data from mongodb User Collection
            EntryModel.findOneAndRemove({ _id: id_entry2 }, (error2, data2) => {

                if (error2) {
                    console.log(error2);
                }
                done();
            });
        });


    });

});
