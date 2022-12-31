import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const linkRouter = router({
  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  deleteLink: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.link.delete({
        where: {
          id: input.id,
        },
      });
    }),
  archiveLink: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          status: "ARCHIVED",
        },
      });
    }),
  verifyShortUrl: protectedProcedure
    .input(z.object({ shortUrl: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.link.findFirst({
        where: {
          shortUrl: input.shortUrl,
          userId: ctx.session.user.id,
        },
      });
    }),
  createLink: protectedProcedure
    .input(z.object({ url: z.string(), shortUrl: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.link.create({
        data: {
          url: input.url,
          shortUrl: input.shortUrl,
          userId: ctx.session.user.id,
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
