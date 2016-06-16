import { Injectable } from 'angular2/core';
import { PinUtil } from './pin-util';

@Injectable()
export class PinSDKLoader{
  constructor(){
    PinUtil.loadSDK();
    // PinUtil.configSDK();
  }
}
