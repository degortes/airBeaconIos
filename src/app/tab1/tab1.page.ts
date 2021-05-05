import { Component , OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IBeaconRegion, IBeaconAdvertisement } from 'capacitor-ibeacon';

function _window(): any { return window; }
 
const { IBeacon } = Plugins;



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public uuid: string;

  constructor(public bregion: IBeaconRegion,
    public beadv: IBeaconAdvertisement) {}

  async ngOnInit() {
    
    
    this.uuid = 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E';
    console.log(this.beadv);
    console.log(this.bregion);
    
    await IBeacon.requestAlwaysAuthorization();
    IBeacon.addListener('enteredRegion', (response) => {
      const region = response.region;
      console.log(`Entered region: ${region.identifier} (${region.uuid})`);
    });
    IBeacon.addListener('leftRegion', (response) => {
      const region = response.region;
      console.log(`Left region: ${region.identifier} (${region.uuid})`);
    });
    IBeacon.startMonitoringForRegion({
      uuid: 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E',
      identifier: 'Dead Beef',
      minor: 1,
      major: 3
    });
    let uuid = 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E';
    this.customLocation(this.uuid, "gigi" )
  }
    public customLocation(uuid, didRangeBeaconsInRegionHandler): void {

    console.log('start beacons ' + uuid);
    let window = _window();
    let locationManager = window.cordova.plugins.locationManager;
    console.log(locationManager);

    // Request permission to use location on iOS
    locationManager.requestAlwaysAuthorization(); 

    locationManager.enableBluetooth();

    let delegate = new locationManager.Delegate();
    delegate.didRangeBeaconsInRegion = didRangeBeaconsInRegionHandler;
    locationManager.setDelegate(delegate);

    let beaconRegion = new locationManager.BeaconRegion('ionic-beacon', uuid);
    locationManager.startRangingBeaconsInRegion(beaconRegion);
  }

}
