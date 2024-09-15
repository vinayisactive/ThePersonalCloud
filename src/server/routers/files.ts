import { publicProcedure, router } from "../trpc";

export const fileRouter = router({
    getData: publicProcedure.query(() => {
        return [0,1,2,3]
    })
}); 

export const FileRouter = typeof fileRouter; 