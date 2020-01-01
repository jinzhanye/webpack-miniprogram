//app.js
import moment from 'moment';
import { camelCase } from 'lodash';

App({
  onLaunch: function () {
    console.log('-----------------------------------------------x');
    let sFromNowText = moment(new Date().getTime() - 360000).fromNow();
    console.log(sFromNowText);
    console.log(camelCase('OnLaunch'));
  },
  globalData: {
    userInfo: null
  }
})


