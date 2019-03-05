import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidators } from './../../common/validators';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form = new FormGroup({});

  @Input() searchCriteria: any[];
  @Output() onSubmit: EventEmitter<any[]> = new EventEmitter<any[]>();

  onClick(){
    this.onSubmit.emit(this.form.value);
  }

  onEnter(){
    this.onSubmit.emit(this.form.value);
  }

  getPermissionAvailable(category:string,subcategory:string){
    return true;
  }
 
  constructor() { }

  public includeRequired(validators:any){
    if(validators!==undefined){
      for(let validator of validators){
          if(validator==='required')
          return true;
      }
    }
  }

  ngOnInit() {
  for(let row of this.searchCriteria)
    for(let input of row){
      if(input.id!==undefined){
        if(input.validators!==undefined){
            this.form.registerControl(input.id,new FormControl('',FormValidators.getValidators(input.validators)));
        }else{
          this.form.registerControl(input.id,new FormControl('',null));
        }
      }
    }
  }

}
