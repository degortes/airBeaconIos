import { Component , OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IBeaconRegion, IBeaconAdvertisement } from 'capacitor-ibeacon';
 
const { IBeacon } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor() {}

  async ngOnInit() {
    console.log();
    
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
  }

}
