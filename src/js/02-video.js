import Player from '@vimeo/player';
import _throttle from 'lodash.throttle';

const LOCAL_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  const seconds = data.seconds;
  localStorage.setItem(LOCAL_TIME, String(seconds));
};

player.on('timeupdate', _throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(LOCAL_TIME)).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      // the time was less than 0 or greater than the video’s duration
      break;

    default:
      // some other error occurred
      break;
  }
});
