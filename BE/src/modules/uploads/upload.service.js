import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

await fs.mkdir(UPLOAD_DIR, { recursive: true });

export const uploadService = {
  async saveFile(file) {
    const ext = path.extname(file.filename);

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    const filepath = path.join(UPLOAD_DIR, filename);

    // baca seluruh file ke memory
    const buffer = await file.toBuffer();

    // simpan ke disk
    await fs.writeFile(filepath, buffer);

    return {
      filename,
      originalName: file.filename,
      mimetype: file.mimetype,
      path: filepath,
      size: buffer.length,
      url: `/uploads/${filename}`,
    };
  },
};
