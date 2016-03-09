/**
 * Therapist model events
 */

'use strict';

import {EventEmitter} from 'events';
var Therapist = require('./Therapist.model');
var TherapistEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TherapistEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Therapist.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TherapistEvents.emit(event + ':' + doc._id, doc);
    TherapistEvents.emit(event, doc);
  }
}

export default TherapistEvents;
