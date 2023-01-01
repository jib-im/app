import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const linkRouter = router({
  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getLink: protectedProcedure
    .input(z.object({ shortUrl: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.link.findFirst({
        where: {
          shortUrl: input.shortUrl,
          AND: {
            userId: ctx.session.user.id,
          },
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
  removeLink: protectedProcedure
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
  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string(),
        shortUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          url: input.url,
          shortUrl: input.shortUrl,
        },
      });
    }),

  verifyShortUrl: protectedProcedure
    .input(z.object({ shortUrl: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.link.findUnique({
        where: {
          shortUrl: input.shortUrl,
        },
      });
    }),
});
