import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config:{
    token: 'eyJhcGlLZXkiOiJza19saXZlX2RhYzA1MDBiYzJhODI5ZDFkMjFjOTk1NWJkNTMxNDgzNmI3OWQwNjUyMzc4ZjYxYTAwZGE4YzBkYmQ2MmI4MmYiLCJhcHBJZCI6InVzcHJkNmc1OTUiLCJyZWdpb25zIjpbInNlYTEiXX0='
  }
});
