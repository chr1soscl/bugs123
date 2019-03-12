import { Validators } from '@angular/forms';
import { Validation } from '../common/constants/validation';
import { Constants } from '../common/constants/constants';

export class FormValidators{
    public static getValidators(validators:string[]):any[]{
        let validatorObjects:Validators[]=[];
        for(let validator of validators){
            let validatorObject=this.getValidator(validator);
            if(validatorObject!==undefined)
                validatorObjects.push(validatorObject);
        }
        return validatorObjects;
    }

    public static getValidator(validator:string){
         if(validator===Validation.REQUIRED){
            return Validators.required;
         }else
         if(validator.indexOf(Validation.MINLENGTH)!==-1){
            let values=validator.split(Constants.VERTICAL_BAR);
            return Validators.minLength(Number(values[1]));
         }else
         if(validator.indexOf(Validation.MAXLENGTH)!==-1){
            let values=validator.split(Constants.VERTICAL_BAR);
            return Validators.maxLength(Number(values[1]));
         }else
         if(validator.indexOf(Validation.MIN)!==-1){
            let values=validator.split(Constants.VERTICAL_BAR);
            return Validators.min(Number(values[1]));
         }else
         if(validator.indexOf(Validation.MAX)!==-1){
            let values=validator.split(Constants.VERTICAL_BAR);
            return Validators.max(Number(values[1]));
         }else
         if(validator.indexOf(Validation.EMAIL)!==-1){
            return Validators.email;
         }else
         if(validator.indexOf(Validation.PATTERN)!==-1){
            let values=validator.split(Constants.VERTICAL_BAR);
            return Validators.pattern(values[1]);
         }
    }
    

}