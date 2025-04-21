// import expressAsyncHandler from "express-async-handler"

// import Town from '../models/townsmodel.js'
// import { CustomError } from "../middlewares/customErr.js";

// import { validateTypeInput } from "../Validators/typesValidator.js";
// import { TownsArray } from "./towns.js";

// const getTowns = async (req: Request | any, res: Response | any) => {
//     try {
//         const Towns = await Town.find({ deletedAt: null })
//         res.status(200).json(Towns)
//         return
//     } catch (error) {
//         return res.status(400).json({ message: "Error Ocured try again", error })


//     }
// }
// const registerTown = async (req: Request | any, res: Response | any) => {
//     try {
//         console.log(TownsArray.length)
//         for (let index = 0; index < TownsArray.length; index++) {
//             const element = TownsArray[index];
//             req.body.createdBy = req.user._id
//             req.body.name = element.name
//             req.body.location = {
//                 lng: element.lng,
//                 lat: element.lat
//             }

//             await Town.create(req.body)
//         }
//         // await CustomError(validateTypeInput, req.body, res)

//         res.status(200).json({ message: 'Created Successfull' })
//         return
//     } catch (error) {
//         console.log(error)
//     }
// }
// const getTown = async (req: Request | any, res: Response | any) => {

//     const Town = await Town.findById()
//     res.status(200).json(Town)
//     return
// }

// const updateTown = async (req: Request | any, res: Response | any) => {
//     try {
//         let updates = await Town.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
//         return res.status(200).json({ message: 'Town Updated successfully ', updates })
//     } catch (error) {
//         res.status(400).json({ message: 'Town Updated failed ' })
//         return
//     }
// }
// const deleteTown = async (req: Request | any, res: Response | any) => {
//     try {
//         let deleted = await Town.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
//         return res.status(200).json({ message: ' deleted successfully ', deleted })
//     } catch (error) {
//         res.status(404);
//         return
//         console.log(error)
//         throw new Error("deletion Failed ")
//     }
// }

// export {
//     getTown, getTowns, updateTown, deleteTown, registerTown
// }