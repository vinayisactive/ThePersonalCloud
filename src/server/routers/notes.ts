import { publicProcedure, router } from "../trpc";

export const noteRouter = router({
    getData: publicProcedure.query(() => {
        return [0,1,2,3]
    })
}); 

export const NoteRouter = typeof noteRouter; 