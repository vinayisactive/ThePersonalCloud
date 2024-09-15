import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { noteRouter } from "./routers/notes";
import { photoRouter } from "./routers/photos";
import { fileRouter } from "./routers/files";

export const appRouter = router({
    user: userRouter,
    note: noteRouter,
    photo: photoRouter,
    file: fileRouter
}); 

export type AppRouter = typeof appRouter; 