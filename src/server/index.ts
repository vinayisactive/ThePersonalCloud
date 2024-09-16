import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { noteRouter } from "./routers/notes";
import { imageRouter } from "./routers/images";
import { fileRouter } from "./routers/files";

export const appRouter = router({
    user: userRouter,
    note: noteRouter,
    image: imageRouter,
    file: fileRouter
}); 

export type AppRouter = typeof appRouter; 