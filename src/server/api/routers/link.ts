import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
        shortUrl: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.link.create({
        data: {
          url: input.url,
          shortUrl: input.shortUrl,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string().url(),
        shortUrl: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
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
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.link.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
