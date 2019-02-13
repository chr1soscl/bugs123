import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() form:FormGroup;
  @Input() input:any;

}
