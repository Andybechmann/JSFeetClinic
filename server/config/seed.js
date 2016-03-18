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
        name:'test1',
        description:'Erfaring behandler',
        imageUrl:"../../assets/images/2.jpg",
        treatments:[{
          name:'Luksus Fodbehandling',
          licensed: false
        },{name:'Fodbehandling',
          licensed: true}
        ]
    },{
        name:'test2',
        description:'Erfaring behandler',
        imageUrl:"../../assets/images/2.jpg",
        treatments:[{
          name:'Luksus Fodbehandling',
          licensed: false
        },{name:'Fodbehandling',
          licensed: true}
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
