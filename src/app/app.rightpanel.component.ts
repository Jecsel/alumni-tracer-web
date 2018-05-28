import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {AppComponent} from './app.component';
import {ScrollPanel} from 'primeng/primeng';

@Component({
    selector: 'app-rightpanel',
    template: `
        <div id="layout-right-panel" [ngClass]="{'layout-right-panel-active': app.rightPanelActive}" (click)="app.onRightPanelClick()">
            <p-scrollPanel #scrollRightPanel [style]="{height: '100%'}">
                  <div class="right-panel-scroll-content">
                      <span class="header">Message Box</span>
                      <p-accordion [multiple]="false">
                          <p-accordionTab header="Inbox Messages" [selected]="true">
                              <ul>
                                  <li>
                                      <img src="assets/layout/images/avatar-maggie.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Maggie Walker</span>
                                          <span class="message">Professionally cultivate one-to-one service.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-tom.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Tom Baker</span>
                                          <span class="message">Dynamically innovate leveling state of art.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-brooke.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Brooke Wright</span>
                                          <span class="message">Holisticly extensible testing procedures.</span>
                                      </div>
                                  </li>
                              </ul>
                          </p-accordionTab>
                          <p-accordionTab header="Sent">
                              <ul>
                                  <li>
                                      <img src="assets/layout/images/avatar-tom.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Tom Baker</span>
                                          <span class="message">Envisioned multimedia based expertise.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-lucas.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Lucas Fox</span>
                                          <span class="message">Visualize quality intellectual capital.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-brooke.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Brooke Wright</span>
                                          <span class="message">Engage worldwide methodologies.</span>
                                      </div>
                                  </li>
                              </ul>
                          </p-accordionTab>
                          <p-accordionTab header="Drafts">
                              <ul>
                                  <li>
                                      <img src="assets/layout/images/avatar-lucas.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Lucas Fox</span>
                                          <span class="message">Customer directed convergence.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-tom.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Tom Baker</span>
                                          <span class="message">Installed base after maintainable products.</span>
                                      </div>
                                  </li>
                                  <li>
                                      <img src="assets/layout/images/avatar-maggie.png" alt="ecuador-layout" />
                                      <div class="message-container">
                                          <span class="name">Maggie Walker</span>
                                          <span class="message">Process-centric "outside the box" thinking.</span>
                                      </div>
                                  </li>
                              </ul>
                          </p-accordionTab>
                      </p-accordion>
                      <i class="fa fa-ellipsis-h"></i>

                      <span class="header">Recent Activity</span>
                      <p-panel>
                          <ul>
                              <li>
                                  <img src="assets/layout/images/avatar-lucas.png" alt="ecuador-layout" />
                                  <div class="activity-container">
                                      <span class="name">Lucas Fox</span>
                                      <span class="activity">Does some magic with new magic wand.</span>
                                      <span class="activity-date">23.12.2015 12:00</span>
                                  </div>
                              </li>
                              <li>
                                  <img src="assets/layout/images/avatar-maggie.png" alt="ecuador-layout" />
                                  <div class="activity-container">
                                      <span class="name">Maggie Walker</span>
                                      <span class="activity">Publish a new article named ‘How you doin?’</span>
                                      <span class="activity-date">23.12.2015 12:00</span>
                                  </div>
                              </li>
                              <li>
                                  <img src="assets/layout/images/avatar-brooke.png" alt="ecuador-layout" />
                                  <div class="activity-container">
                                      <span class="name">Brooke Wright</span>
                                      <span class="activity">Read 4 recent news from timeline</span>
                                      <span class="activity-date">23.12.2015 12:00</span>
                                  </div>
                              </li>
                          </ul>
                      </p-panel>
                  </div>
            </p-scrollPanel>
        </div>
    `
})
export class AppRightPanelComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel') rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) {}

    ngAfterViewInit() {
      setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }

    onTabChange(event) {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 450);
    }
}
