import { Person } from "components";
import { DeleteIconBtn } from "./common/IconBtns";

export default function UsersTable(props) {
  //? Props
  const { deleteUserHandler, users } = props;

  //? Render(s)
  return (
    <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th></th>
            <th className="border-gray-100 border-x-2">Mã</th>
            <th>Vai trò</th>
            <th className="border-gray-100 border-x-2">Tên</th>
            <th>Email</th>
            <th className="border-r-2 border-gray-100">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {users.length > 0 &&
            users.map((user) => (
              <tr
                className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                key={user.id?.toString()}
              >
                <td className="px-2 py-4">
                  <Person className="mx-auto w-7 h-7" />
                </td>
                <td className="px-2 py-4">{user.id}</td>
                <td className="px-2 py-4 font-bold">
                  {user.account?.roles.map((role, index) => {
                    const { slug } = role;
                    return (
                      <span
                        key={index.toString()}
                        className={`py-1.5 px-2 rounded-lg font-bold inline-block
                    ${
                      slug === "admin"
                        ? "text-blue-600 bg-blue-50"
                        : slug === "user"
                          ? "text-amber-600 bg-amber-50"
                          : slug
                            ? "text-green-600 bg-green-50"
                            : ""
                    }
                    `}
                      >
                        {slug}
                      </span>
                    );
                  })}
                </td>
                <td className="px-2 py-4">{user.name}</td>
                <td className="px-2 py-4">{user.email}</td>
                <td className="px-2 py-4">
                  <DeleteIconBtn onClick={() => deleteUserHandler(user.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
