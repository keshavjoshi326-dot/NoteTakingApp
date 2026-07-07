export function validate(schema: z.ZodType) {
  return (req, res, next)=>{
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message
      })
    }
  req.validatedBody = result.data;

  next();
  }
}
