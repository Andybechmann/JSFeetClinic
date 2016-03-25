/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Therapist from '../api/Therapist/Therapist.model';
import Treatment from '../api/Treatment/Treatment.model';

Treatment.find({}).removeAsync()
  .then(() => {
    Treatment.create({
      name: 'Fodbehandling',
      description: 'Fjernelse af hård hud og evt. ligtorne, klipning og slibning af neglene, ' +
                    'indgnidning af blødgørende negle olie.',
      price: 300,
      duration: 30,
      type: 'Fodbehandling'
    },{
      name: 'Luksus Fodbehandling',
      description: 'En  luksusbehandling for dine fødder og læg, til dig som ønsker velvære.' +
      'Peeling af fødder, ankler og læg.Fjernelse af hård hud og evt. ligtorne.' +
      'Klipning og slibning af neglene, indgnidning af blødgørende negle olie. Fødderne får til ' +
      'sidst en lækker Paraffinbehandling ',
      price: 395,
      duration: 45,
      type: 'Fodbehandling'
    });
  });

Therapist.find({}).removeAsync()
  .then(() => {
    Therapist.createAsync({
      name:'Andy',
      description:'Nyuddanet behandler',
      imageUrl:"../../assets/images/1.jpg",
      treatments:[{
        name:'Luksus Fodbehandling',
        licensed: true
      },{name:'Fodbehandling',
        licensed: true}
      ]
    },{
        name:'Ievgenii',
        description:'Erfaring behandler',
        imageUrl:"../../assets/images/2.jpg",
        treatments:[{
          name:'Luksus Fodbehandling',
          licensed: false
        },{name:'Fodbehandling',
          licensed: true}
        ],
        holiday:[
          {startDate:new Date(2016,2,1,0,0),endDate: new Date(2016,2,15,0,0)},
          {startDate:new Date(2016,4,1,0,0),endDate: new Date(2016,4,15,0,0)}
        ]
    },{
        name:'kathe',
        description:'Erfaring behandler',
        imageUrl:"../../assets/images/2.jpg",
        treatments:[{
          name:'Luksus Fodbehandling',
          licensed: false
        },{name:'Fodbehandling',
          licensed: true}
        ]
    },{
        name:'Kathe Lorenzen',
        description:'Jeg blev lægeeksamineret fodplejer i Sept. 2012. Uddannelsen har jeg taget i Aulum, hvor jeg også har taget kursus i Kinesisk fodmassage samt Gellac. Hotstonemassagen har jeg taget hos Sabine Bruhn (Ringkøbing massage og wellnes). Jeg har også kursus i Shellac fra CND, som jeg også forhandler i klinikken.' +
        'Min klinik ligger i Sønderris i Esbjerg, og det vil glæde mig at se dig til en personlig samt nærværende behandling, hvor velvære er i centrum' +
        'Dine fødder skal bære rundt på din krop lige fra den dag, du tager dine første skridt. Det er en belastning, som faktisk er meget større, end de fleste går rundt og tror' +
        'De fleste fodlidelser og problemer kan forebygges, hvis du giver dine fødder et par minutters opmærksomhed hver dag' +
        'Du har kun det ene par, som skal bære dig gennem hele livet, men ofte glemmer du at pleje dem, fordi de bliver gemt væk i strømper og sko den lange dag. Du bliver først opmærksom på dine fødder, når de bliver ømme eller noget gør ondt i dem.' +
        'Smukke fødder giver velvære for krop og sjæl – dit velvære spejler sig i dit udseende, og giver dig indre og ydre skønhed' ,
        imageUrl:"../../assets/images/2.jpg",
        treatments:[{
          name:'Luksus Fodbehandling',
          licensed: false
        },{name:'Fodbehandling',
          licensed: true}
        ],
        holiday:[
          {startDate:new Date(2016,2,1),endDate: new Date(2016,2,15)},
          {startDate:new Date(2016,4,1),endDate: new Date(2016,4,15)}
        ]
    }
    );
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    },
  {
    name:'Andy',
    address:{
      street:'sønderhedevej',
      streetNumber:40,
      zipCode:6710
    },
    email:'google@.dk',
    phone: 231235345,

    password: 'andy1959',
    provider: 'local',
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
