export function isEmpty(obj: any) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}
export const NumericalExists = (pass: string) => {
    if (/\d/.test(pass)) {
        return true
    }
}

export const isUpper = (str: string) => {
    if (/[a-z]/.test(str) && /[A-Z]/.test(str))
        return true;
}
export const isSpecial = (str: string) => {
    if (/[#?!@$%^&*-]/.test(str))
        return true;
}

// module.exports = { NumericalExists, isUpper, isSpecial }

// .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
//     .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
//     .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
//     .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')