import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-services";

export const userRoutes = new Elysia({ prefix: "/api" })
  .post("/user", async ({ body, set }) => {
    try {
      const result = await registerUser(body);
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === " EMAIL sudah terdaftar") {
        set.status = 400;
        return { EROR: " EMAIL sudah terdaftar" };
      }
      set.status = 500;
      return { EROR: "Internal Server Error" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  });
