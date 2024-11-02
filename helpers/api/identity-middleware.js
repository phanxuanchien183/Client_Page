import { usersRepo } from "../db-repo";

async function identityMiddleware(req, identity = "customer", isJwt = false) {
  if (identity === "customer" && isJwt === false) return;

  const userId = req.headers.get("userId");
  const user = await usersRepo.getOne({ id: userId });
  const roles = user?.account?.roles?.map(x => x.slug);
  req.headers.set("userRoles", roles);

  if (identity === "admin" && !roles.includes("admin")) {
    throw "Không có quyền thao tác";
  }

  if (identity === "root") {
    throw "Không có quyền thao tác, chỉ có Quản trị viên mới có thể thao tác";
  }
}

export { identityMiddleware };
