import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const linkRouter = router({
  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        shortUrl: true,
        createdAt: true,
        updatedAt: true,
        clicks: true,
        description: true,
        status: true,
        url: true,
      },
    });
  }),
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
