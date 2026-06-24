import { uploadController } from "./upload.controller.js";
// import { imageService } from "./upload.service.js";

export default async function (fastify) {
  fastify.post("/img", uploadController.uploadSingle);
}
