import moment from 'moment';

import * as MapsHelper from './mapsHelper';
export const mapsHelper = MapsHelper;

import easingFunctions from './easing';
export const easing = easingFunctions;

import * as YoutubeHelper from './youtube';
export const youtubeHelper = YoutubeHelper;


const S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const GenerateUniqKey = () => (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)

let inflectionCases = [2, 0, 1, 1, 1, 2];
export const inflection = (q, words) => 
  words[(q % 100 > 4 && q % 100 < 20 ) ?  2 : inflectionCases[(q % 10 < 5) ? q % 10 : 5]];

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const getPeriod = (startsat, endsat, options = {}) => {
  const result = {
    date: '',
    time: '',
  };
  const {
    startDateFormat = 'dd, DD MMMM YYYY',
    endDateFormat = 'DD MMMM',
    startTimeFormat = 'HH:mm',
    endTimeFormat = 'HH:mm',
    dateSeparator = ' - ',
    timeSeparator = ' - ',
    capitalizeDate = true,
  } = options;

  if (startsat != null) {
    const start = moment(startsat);
    result.date = `${start.format(startDateFormat)}`;
    result.time = `${start.format(startTimeFormat)}`;

    if (capitalizeDate) {
      result.date = capitalizeFirstLetter(result.date);
    }

    if (endsat != null && startsat != endsat) {
      const end = moment(endsat);
      let showEndDate = start.format('DDMMYYYY') !== end.format('DDMMYYYY');
      if (showEndDate && start.add(1, 'd').date() === end.date() && end.hour() <= start.hour() && end.hour() <= 12){
        showEndDate = false;
      }

      if (showEndDate) {
        result.date = `${result.date}${dateSeparator}${end.format(endDateFormat)}`;
      }
      result.time = `${result.time}${timeSeparator}${end.format(endTimeFormat)}`;
    }
  }

  return result;
};
