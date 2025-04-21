import Validator, { isEmpty } from 'validator';


export const validateTypeInput = (data: any) => {
    let errors: any = {};
    data.name = !isEmpty(data.name) && data.name !== undefined ? data.name : '';
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name  field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}