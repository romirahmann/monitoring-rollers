export async function authMiddleware(request, reply) {
  try {
    const token = request.cookies.token;

    if (!token) {
      return reply.status(401).send({
        message: "Unauthorized",
      });
    }

    const decoded = request.server.jwt.verify(token);

    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid token",
    });
  }
}
