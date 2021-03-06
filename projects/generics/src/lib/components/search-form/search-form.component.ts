import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidators } from './../../common/validators';
import { Validation } from '../../common/constants/validation';
import { Constants } from '../../common/constants/constants'

@Component({
  selector: 'lib-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

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
          if(validator===Validation.REQUIRED)
          return true;
      }
    }
  }

  ngOnInit() {
    for(let input of this.searchCriteria){
      if(input.id!==undefined){
        if(input.validators!==undefined){
            this.form.registerControl(input.id,new FormControl(Constants.EMPTY_SPACE,FormValidators.getValidators(input.validators)));
        }else{
          this.form.registerControl(input.id,new FormControl(Constants.EMPTY_SPACE,null));
        }
      }
    }
  }

}
