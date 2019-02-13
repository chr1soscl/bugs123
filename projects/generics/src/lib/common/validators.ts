import { Validators } from "@angular/forms"

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
         if(validator==='required'){
            return Validators.required;
         }else
         if(validator.indexOf('minlength')!==-1){
            let values=validator.split('|');
            return Validators.minLength(Number(values[1]));
         }else
         if(validator.indexOf('maxlength')!==-1){
            let values=validator.split('|');
            return Validators.maxLength(Number(values[1]));
         }else
         if(validator.indexOf('min')!==-1){
            let values=validator.split('|');
            return Validators.min(Number(values[1]));
         }else
         if(validator.indexOf('max')!==-1){
            let values=validator.split('|');
            return Validators.max(Number(values[1]));
         }else
         if(validator.indexOf('email')!==-1){
            return Validators.email;
         }else
         if(validator.indexOf('pattern')!==-1){
            let values=validator.split('|');
            return Validators.pattern(values[1]);
         }
    }
    

}