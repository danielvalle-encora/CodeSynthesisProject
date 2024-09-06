// export function useProtectedRoutes(router:Router) {
//     router.use(authToken)

//     router.post("/auth/token", (req,res) => {
//         console.log("")
//         next();
//     })
//     .use(authToken)
//     .use((req,res) => {
//         // actual handler
//     })


//     router.post("/auth/public", (req,res) => {
//         console.log("")
//         next();
//     })
//     .use((req,res) => {
//         // actual handler
//     })


//     export router;
// }

// export function useProtectedRoutes1(router:Router) {
    
//     const protectedRouter = Router();

//     router.use(authToken)

//     router.post("/endpoint", (req,res) => {
//         // handler
//     })
//     router.post("/endpoint", (req,res) => {
//         // handler
//     })
//     router.post("/endpoint", (req,res) => {
//         // handler
//     })
//     router.post("/endpoint", (req,res) => {
//         // handler
//     })
//     router.post("/endpoint", (req,res) => {
//         // handler
//     })

//     router.use("/user", router)

//     export router;
// }