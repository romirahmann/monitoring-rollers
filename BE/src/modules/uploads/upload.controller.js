import { uploadService } from "./upload.service.js";

export const uploadController = {
  async uploadSingle(request, reply) {
    const file = await request.file();

    if (!file) {
      return reply.code(400).send({
        message: "File is required",
      });
    }

    const result = await uploadService.saveFile(file);

    return reply.send({
      success: true,
      data: result,
    });
  },
};
