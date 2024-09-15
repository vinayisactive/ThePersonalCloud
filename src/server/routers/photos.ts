import { publicProcedure, router } from "../trpc";

export const photoRouter = router({
    getData: publicProcedure.query(() => {
        return [0,1,2,3]
    })
}); 

export const PhotosRouter = typeof photoRouter; 