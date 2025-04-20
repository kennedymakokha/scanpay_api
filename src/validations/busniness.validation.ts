import Validator from 'validator';
import { isEmpty } from '../utils/isEmpty';
import { Business } from '../types';


export const validateBusinessInput = (data: Business) => {
    let errors: Business | any = {};
    data.business_name = !isEmpty(data.business_name) && data.business_name !== undefined ? data.business_name : '';
    data.description = !isEmpty(data.description) && data.description !== undefined ? data.description : '';
    if (Validator.isEmpty(data.business_name)) {
        errors.business_name = 'Name  field is required';
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = 'Name  field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

