
import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
@Component({
  selector: 'button-basic',
  //templateUrl: './button-basic.html',
  template:`
  <md-content>
    <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
      <button md-button>Yehah</button>
    </section>
  </md-content>

  `,
  styles: [`section {
    background: red;
    border-radius: 3px;
    text-align: center;
    margin: 1em;
    position: relative !important;
    padding-bottom: 10px;
    [md-button], [md-raised-button], [md-fab] {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  md-content {
    margin-right: 100px;
  }
  .label {
    position: absolute;
    bottom: 5px;
    left: 7px;
    font-size: 14px;
    opacity: 0.54;
  }`],
  directives: [MATERIAL_DIRECTIVES]
})
export class ButtonBasic {

}
