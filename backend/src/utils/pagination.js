const { z } = require("zod");

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().max(120).optional(),
  status: z.string().trim().optional(),
});

function parsePagination(query) {
  const result = paginationSchema.safeParse(query);
  if (!result.success) {
    const error = new Error(result.error.issues[0]?.message || "Invalid pagination parameters.");
    error.statusCode = 400;
    throw error;
  }
  const { page, limit, q, status } = result.data;
  return { page, limit, skip: (page - 1) * limit, q, status };
}

function pageResult(items, total, page, limit) {
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

module.exports = { parsePagination, pageResult };
