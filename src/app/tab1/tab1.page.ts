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

   ngOnInit() {
    
    
    this.uuid = 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E';
  }

  async start() {
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
      uuid: this.uuid,
      identifier: '250786',
      minor: 1,
      major: 3
    });


  }

}
