//app.js
import { camelCase } from 'lodash';

App({
  onLaunch: function () {
    console.log('-----------------------------------------------x');
    console.log(camelCase('OnLaunch'));
  },
  globalData: {
    userInfo: null
  }
})

