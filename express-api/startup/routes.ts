import {Router} from 'express';
import authToken from '../middleware/authToken';

import useSignup from '../router/signup';
import useTask from '../router/task';

const router = Router();

router.use("/signup", useSignup);
// router.use("/task", useTask);

useProtectedRoutes(router);
function useProtectedRoutes(router) {
    router.use("/task", useTask);
    // add more routes here
}


export default router;