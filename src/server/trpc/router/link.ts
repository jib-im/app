import { trpc } from "./../../../utils/trpc";
import { z } from "zod";
import generator from "generate-password";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const linkRouter = router({
  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany({
      where: { userId: ctx.session.user.id },
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
