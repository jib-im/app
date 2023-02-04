import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z
        .object({
          sort: z.string().nullish(),
          status: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.link.findMany({
        where:
          input?.status === undefined
            ? {
                userId: ctx.session.user.id,
                status: "ACTIVE",
              }
            : input?.status === "none" || input?.status === "all"
            ? { userId: ctx.session.user.id }
            : {
                userId: ctx.session.user.id,
                OR: input.status?.split(",").map((status) => ({
                  status: status.toUpperCase() as "ACTIVE" | "ARCHIVED",
                })),
              },

        orderBy:
          input && input.sort === "clicks"
            ? {
                clicks: "desc",
              }
            : {
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
  archive: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          status: "ARCHIVED",
        },
      });
    }),
  unarchive: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          status: "ACTIVE",
        },
      });
    }),
  generateShortUrl: protectedProcedure
    .input(
      z.object({
        shortUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingLink = await ctx.prisma.link.findFirst({
        where: {
          shortUrl: input.shortUrl,
        },
      });

      if (existingLink) {
        throw new Error("Short URL already exists");
      }

      return input.shortUrl;
    }),
});
