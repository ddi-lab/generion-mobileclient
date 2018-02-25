import { Platform } from 'react-native';
import { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

import { AppConfig } from '@constants';

const YouTubeStandalone = Platform.OS === 'android' ? YouTubeStandaloneAndroid : YouTubeStandaloneIOS;

export const playVideo = (videoId) => {
  let data = videoId;

  if (Platform.OS === 'android') {
    data = {
      videoId,
      apiKey: AppConfig.googleApiKey,     // Your YouTube Developer API Key
      autoplay: true,             // Autoplay the video
      startTime: 0,             // Starting point of video (in seconds)
    };
  }

  return YouTubeStandalone.playVideo(data)
    .catch(errorMessage => console.error(errorMessage));
};

export const getVideoData = (videoId) => {
  return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${AppConfig.googleApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.items && data.items[0] && data.items[0].snippet) {
        return data.items[0].snippet;
      }
      return null;
    });
};
