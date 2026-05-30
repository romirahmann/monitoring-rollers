import authRoute from "../modules/auth/auth.route.js";
import inspectionsRoute from "../modules/inspections/inspections.route.js";
import masterRoute from "../modules/master/master.route.js";
import userRoute from "../modules/users/user.route.js";

export default async function (app) {
  await app.register(authRoute, { prefix: "/auth" });
  await app.register(userRoute, { prefix: "/users" });
  await app.register(masterRoute, { prefix: "/master" });
  await app.register(inspectionsRoute, { prefix: "/inspections" });
}
