import {Router} from 'express';
import authToken from '../middleware/authToken';

import useSignup from '../router/signup';

const router = Router();

router.use("/signup", useSignup);

// useProtectedRoutes(router)
// useProtectedRoutes1(router) // /user

//router.use("/signup", useSignup);

// router.get("/protected-route", (req,res,next) => {
//     console.log({ request: req.route})
//     next()
//     })
//     .use(authToken)
//     .use((req, res) => {
//     res.send("this is protected data")
    
// });

// router.post("/signup", (req,res) => {})
// router.post("/login", (req,res) => {})

// protected dapat
// router.post("/auth/token", (req,res) => {

// })

// function useProtectedRoutes(router:Router) {
//     router.use(authToken).use("/", /* GET THIS FROM OTHER METHOD OR FILE */)
// }

// // better in afile


export default router;