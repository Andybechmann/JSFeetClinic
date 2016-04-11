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
      _id: '570219df5cca8f701a078f46',
      name: 'Fodbehandling',
      description: 'Fjernelse af hård hud og evt. ligtorne, klipning og slibning af neglene, ' +
      'indgnidning af blødgørende negle olie.',
      imageUrl:"../../assets/images/4.jpg",
      price: 300,
      duration: 30,
      type: 'Fodbehandling'
    }, {
      _id: '570219df5cca8f701a078f47',
      name: 'Luksus Fodbehandling',
      description: 'En  luksusbehandling for dine fødder og læg, til dig som ønsker velvære.' +
      'Peeling af fødder, ankler og læg.Fjernelse af hård hud og evt. ligtorne.' +
      'Klipning og slibning af neglene, indgnidning af blødgørende negle olie. Fødderne får til ' +
      'sidst en lækker Paraffinbehandling ',
      imageUrl:"../../assets/images/4.jpg",
      price: 395,
      duration: 45,
      type: 'Fodbehandling'
    });
  });

Therapist.find({}).removeAsync()
  .then(() => {
    Therapist.createAsync({
        name: 'Andy',
        description: 'Nyuddanet behandler',
        imageUrl: "../../assets/images/glad.jpg",
        treatments: ['570219df5cca8f701a078f46','570219df5cca8f701a078f47'],
        dayWorking: [
          {
            dayOfWeek: 'Mandag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)},
            pauses: [{startTime: new Date(2010, 10, 10, 8, 30), endTime: new Date(2010, 10, 10, 9, 0)},
              {startTime: new Date(2010, 10, 10, 11, 30), endTime: new Date(2010, 10, 10, 12, 0)}]
          },
          {
            dayOfWeek: 'Tirsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Onsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Torsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Fredag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Lørdag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Søndag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          }
        ]
      }, {
        name: 'Ievgenii',
        description: 'Erfaring behandler',
        imageUrl: "../../assets/images/black.jpg",
        treatments: ['570219df5cca8f701a078f46'],
        dayWorking: [
          {
            dayOfWeek: 'Mandag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Tirsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Onsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Torsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Fredag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Lørdag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Søndag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          }
        ],
        holiday: [
          {startDate: new Date(2016, 2, 1, 0, 0), endDate: new Date(2016, 2, 15, 0, 0)},
          {startDate: new Date(2016, 4, 1, 0, 0), endDate: new Date(2016, 4, 15, 0, 0)}
        ]
      }, {
        name: 'kathe',
        description: 'Erfaring behandler',
        imageUrl: "../../assets/images/ked.jpg",
      treatments: ['570219df5cca8f701a078f47'],
        dayWorking: [
          {
            dayOfWeek: 'Mandag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Tirsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Onsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Torsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Fredag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Lørdag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Søndag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          }
        ]
      }, {
        name: 'Kathe Lorenzen',
        description: 'Jeg blev lægeeksamineret fodplejer i Sept. 2012. Uddannelsen har jeg taget i Aulum, hvor jeg også har taget kursus i Kinesisk fodmassage samt Gellac. Hotstonemassagen har jeg taget hos Sabine Bruhn (Ringkøbing massage og wellnes). Jeg har også kursus i Shellac fra CND, som jeg også forhandler i klinikken.' +
        'Min klinik ligger i Sønderris i Esbjerg, og det vil glæde mig at se dig til en personlig samt nærværende behandling, hvor velvære er i centrum' +
        'Dine fødder skal bære rundt på din krop lige fra den dag, du tager dine første skridt. Det er en belastning, som faktisk er meget større, end de fleste går rundt og tror' +
        'De fleste fodlidelser og problemer kan forebygges, hvis du giver dine fødder et par minutters opmærksomhed hver dag' +
        'Du har kun det ene par, som skal bære dig gennem hele livet, men ofte glemmer du at pleje dem, fordi de bliver gemt væk i strømper og sko den lange dag. Du bliver først opmærksom på dine fødder, når de bliver ømme eller noget gør ondt i dem.' +
        'Smukke fødder giver velvære for krop og sjæl – dit velvære spejler sig i dit udseende, og giver dig indre og ydre skønhed',
        imageUrl: "../../assets/images/påske.jpg",
      treatments: ['570219df5cca8f701a078f46','570219df5cca8f701a078f47'],
        dayWorking: [
          {
            dayOfWeek: 'Mandag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Tirsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Onsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Torsdag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Fredag',
            active: true,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Lørdag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          },
          {
            dayOfWeek: 'Søndag',
            active: false,
            openingHours: {startTime: new Date(2010, 10, 10, 7, 0), endTime: new Date(2010, 10, 10, 15, 0)}
          }
        ],
        holiday: [
          {startDate: new Date(2016, 2, 1), endDate: new Date(2016, 2, 15)},
          {startDate: new Date(2016, 4, 1), endDate: new Date(2016, 4, 15)}
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
        name: 'Andy',
        address: {
          street: 'sønderhedevej',
          streetNumber: 40,
          zipCode: 6710
        },
        email: 'google@.dk',
        phone: 231235345,

        password: 'andy1959',
        provider: 'local',
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
