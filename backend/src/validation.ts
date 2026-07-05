import z from "zod";

const titleSchema = z.string().trim().max(100);
const contentSchema = z.string().trim().max(1000);

export const createNoteSchema = z.object({
  title: titleSchema.optional(),
  content: contentSchema.optional()
}).refine(data => {
    return Boolean(data.title || data.content);
  }, {message: "Provide atleast one field to create a note."});

export const updateNoteSchema = z.object({
    title: titleSchema.optional(),
    content: contentSchema.optional()
}).refine(data => {
    return data.title !== undefined || data.content !== undefined;
  }, {message: "Provide atleast one field to update."});
