import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormValidators } from './../../common/validators';
import { CustomValidators } from '../../common/custom.validators';
import { Validation } from '../../common/constants/validation';
import { GenericInputType } from '../../common/constants/generic-input-type';
import { Constants } from '../../common/constants/constants';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form;

  @Input() searchCriteria: any[];
  @Output() onSubmit: EventEmitter<any[]> = new EventEmitter<any[]>();

  onClick(action: any) {
    const values: any[] = [];
    values.push(this.form.value);
    values.push({action: action});
    this.onSubmit.emit(values);
  }

  onEnter() {
    this.onSubmit.emit(this.form.value);
  }

  getPermissionAvailable(category: string, subcategory: string) {
    return true;
  }

  constructor(private fb: FormBuilder) { }

  public includeRequired(validators: any) {
    if (validators !== undefined) {
      for (const validator of validators) {
          if (validator === Validation.REQUIRED) {
          return true;
          }
      }
    }
  }

  ngOnInit() {
     this.buildFormGroup(this.searchCriteria);
  }

  public buildFormGroup(fields) {
    this.form = new FormGroup({});
    for (const row of fields) {
      for (const input of row) {
        if (input.id !== undefined) {

          if(input.type!==undefined && input.type===GenericInputType.CHECKBOX){
            this.form.addControl(input.id, this.getCheckBoxFormArray(input));
          }
          if(input.type!==undefined && (input.type===GenericInputType.RADIO || input.type===GenericInputType.DATE || input.type===GenericInputType.COMBOBOX)){
            this.form.addControl(input.id, this.getRequiredValidator(input.required));
          }else{
            if (input.validators !== undefined) {
                this.form.addControl(input.id, new FormControl(Constants.EMPTY_SPACE, FormValidators.getValidators(input.validators)));
            } else {
                this.form.addControl(input.id, new FormControl(Constants.EMPTY_SPACE, null));
            }
          }
        }
      }
    }
    console.log(this.form);
  }

  updateCheckboxValue(formArray,controlName,checked,value){
    const formArr=<FormArray>this.form.controls[formArray];
    if(!checked){   
      formArr.controls[controlName].setValue(false);
    }else{
      formArr.controls[controlName].setValue(value);
    }      
  }

  updateRadioValue(inputId,checked,optionId){
    const control=<FormControl>this.form.controls[inputId];
    if(!checked){   
      control.setValue(Constants.EMPTY_SPACE);
    }else{
      control.setValue(optionId);
    }
    
  }

  getCheckBoxValidator(required:boolean){
    if(required){
       return CustomValidators.multipleCheckboxRequireOne;
    }
    return null;
  }

  getRequiredValidator(required:boolean):FormControl{
    if(required){
       return new FormControl(Constants.EMPTY_SPACE,Validators.required);
    }else {
      return new FormControl(Constants.EMPTY_SPACE,null);
    }
  }

  getCheckBoxFormArray(input):FormArray{
    return this.fb.array(
      input.options.map(
        () => this.fb.control(false)
        ),
        this.getCheckBoxValidator(input.required)
    );
  }
}
