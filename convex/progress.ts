import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const markCompleted = mutation({
  args: {
    moduleId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId_moduleId", (q) => 
        q.eq("userId", userId).eq("moduleId", args.moduleId)
      )
      .unique();
    if (!existing) {
      await ctx.db.insert("userProgress", {
        userId,
        moduleId: args.moduleId,
        completedAt: Date.now(),
      });
    }
    return { success: true };
  },
});
export const getUserProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId_moduleId", (q) => q.eq("userId", userId))
      .collect();
    return progress.map((p) => p.moduleId);
  },
});