import Validator from 'validator';
import { isEmpty, isSpecial, NumericalExists } from '../utils/isEmpty';
import { Business, User } from '../types';







export const validateUserInput = (data: User) => {
    let errors: Business | any = {};
    data.phone_number = !isEmpty(data.phone_number) && data.phone_number !== undefined ? data.phone_number : '';
    // data.ID_No = !isEmpty(data.ID_No) && data.ID_No !== undefined ? data.ID_No : '';
    // data.business = !isEmpty(data.business) && data.business !== undefined ? data.business : '';
    // data.fullname = !isEmpty(data.fullname) && data.fullname !== undefined ? data.fullname : '';
    // data.vendorName = !isEmpty(data.vendorName) && data.vendorName !== undefined ? data.vendorName : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Kindly Enter a valid phone number';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const validateVendorInput = (data: User) => {
    let errors: Business | any = {};
    data.phone_number = !isEmpty(data.phone_number) && data.phone_number !== undefined ? data.phone_number : '';
    data.ID_No = !isEmpty(data.ID_No) && data.ID_No !== undefined ? data.ID_No : '';
    data.business = !isEmpty(data.business) && data.business !== undefined ? data.business : '';
    data.fullname = !isEmpty(data.fullname) && data.fullname !== undefined ? data.fullname : '';
    data.vendorName = !isEmpty(data.vendorName) && data.vendorName !== undefined ? data.vendorName : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Kindly Enter a valid phone number';
    }
    if (Validator.isEmpty(data.ID_No)) {
        errors.ID_No = 'National ID  field is required';
    }
    if (Validator.isEmpty(data.business)) {
        errors.business = 'Business category  field is required';
    }
    if (Validator.isEmpty(data.vendorName)) {
        errors.vendorName = 'Business name  field is required';
    }
    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = 'Vendor name  field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be more than 8 characters long';
    }
    if (!NumericalExists(data.password)) {
        errors.password = 'Password Must have at least one Numerical value';
    }
    if (!isSpecial(data.password)) {
        errors.password = 'Password Must contain at least one special characters  ';
    }

    if (!Validator.isLength(data.phone_number, { min: 10, max: 14 })) {
        errors.phone = 'phone Number  must have at least  10 characters ';
    }
    // if (data.password !== data.confirm_password) {
    //     errors.new_password = 'Password Mismatch    ';
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}



