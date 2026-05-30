export const successResponse = (
  reply,
  { statusCode = 200, message = "Success", data = null },
) => {
  return reply.status(statusCode).send({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  reply,
  { statusCode = 500, message = "Internal Server Error", errors = null },
) => {
  return reply.status(statusCode).send({
    success: false,
    message,
    errors,
  });
};
