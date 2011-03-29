
/* A translation to JavaScript of the Django/Python timesince function:
*  
*    https://github.com/django/django/blob/master/django/utils/timesince.py
*/

Date.prototype.timesince = function(now) {
  
  var chunks = [
    [ 60 * 60 * 24 * 365, 'year', 'years'],
    [ 60 * 60 * 24 * 30, 'month', 'months' ],
    [ 60 * 60 * 24, 'day', 'days' ],
    [ 60 * 60, 'hour', 'hours' ],
    [ 60, 'minute', 'minutes' ]
  ];

  now = now || new Date();

  var delta_seconds = Math.floor((now.getTime() - this.getTime())/1000);

  if (delta_seconds <= 0) {
    return '0 minutes';
  }

  for (var i=0; i<chunks.length; i++) {
    count1 = Math.floor( delta_seconds / chunks[i][0] );
    remainder1 = delta_seconds % chunks[i][0];
    if ( count1 != 0 ) {
      break;
    }
  }

  if (i >= chunks.length) {
    return '0 minutes';
  }

  var s = count1 + ' ' + ((count1 > 1) ? chunks[i][2] : chunks[i][1]);

  i++;

  if ( i < chunks.length ) {
    count2 = Math.floor( remainder1 / chunks[i][0] );
    if ( count2 != 0 ) {
      s = s + ', ' + count2 + ' ' + ((count2 > 1) ? chunks[i][2] : chunks[i][1]);
    }
  }

  return s;
}

Date.prototype.timeuntil = function(now) {
  now = now || new Date();
  return now.timesince(this);
}