export const CustomError = (validator: any, body: any, res: any, next?: any) => {
    const { errors, isValid } = validator(body);
    if (!isValid) {
        let error = Object.values(errors)[0];
        res.status(400).json(error);
        return
    } else {

        return
    }
}