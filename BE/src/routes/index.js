import authRoute from "../modules/auth/auth.route.js";
import inspectionsRoute from "../modules/inspections/inspections.route.js";
import installationRoute from "../modules/installation/installation.route.js";
import masterRoute from "../modules/master/master.route.js";
import uploadRoute from "../modules/uploads/upload.route.js";
import userRoute from "../modules/users/user.route.js";

export default async function (app) {
  await app.register(authRoute, { prefix: "/auth" });
  await app.register(userRoute, { prefix: "/users" });
  await app.register(masterRoute, { prefix: "/master" });
  await app.register(inspectionsRoute, { prefix: "/inspections" });
  await app.register(uploadRoute, { prefix: "/upload" });
  await app.register(installationRoute, { prefix: "/installations" });
}
