import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
const applicationTables = {
  files: defineTable({
    userId: v.id("users"),
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    description: v.optional(v.string()),
    uploadedAt: v.number(),
  })
    .index("by_userId_uploadedAt", ["userId", "uploadedAt"])
    .index("by_userId_storageId", ["userId", "storageId"]),
  userProgress: defineTable({
    userId: v.id("users"),
    moduleId: v.string(),
    completedAt: v.number(),
  })
    .index("by_userId_moduleId", ["userId", "moduleId"]),
};
export default defineSchema({
  ...authTables,
  ...applicationTables,
});