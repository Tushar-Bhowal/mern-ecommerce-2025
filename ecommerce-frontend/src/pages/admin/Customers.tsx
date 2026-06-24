import AdminSidebar from "../../components/Shared/admin/AdminSidebar";
import TableHOC from "../../components/Shared/admin/TableHOC";
import { FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { ReactElement } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/api/userApi";
import { LineSkeleton } from "@/components/Shared/Loader";
import toast from "react-hot-toast";
import { CustomError } from "@/types/api-types";
import { responseToast } from "@/utils/Features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id;
  const { isLoading, data, isError, error } = useAllUsersQuery(userId!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: userId! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          avatar: <img className="rounded-lg" src={i.photo} alt={i.name} />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="h-screen xl:grid xl:grid-cols-6 bg-gray-50/50">
      <div>
        <AdminSidebar />
      </div>

      <div className="md:col-span-5 flex flex-row overflow-y-auto m-4 p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="w-full">
          {" "}
          {isLoading ? (
            <>
              <LineSkeleton />
            </>
          ) : (
            Table
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
