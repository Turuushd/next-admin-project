"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";
import { EditDialog } from "./edit-dialog";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleOnCreateUser = (values) => {
    fetch("/api/users", { method: "POST", body: JSON.stringify(values) })
      .then((res) => res.json())
      .then((newData) => {
        setData([...data, newData.data]);
      });
    setCreateModalOpen(false);
  };

  const handleOnEdit = (object, id) => {
    fetch(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(object) })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setData([...data].filter((item) => item.id !== id));
      });
  };

  const handleClick = () => {
    if (data.length !== limit) {
      setLimit(limit + 10);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Хэрэглэгчид</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable
            data={data}
            limit={limit}
            handleDelete={handleDelete}
            onClose={setCreateModalOpen}
            onEdit={handleOnEdit}
          />
          {limit < data.length && (
            <div className="flex justify-center p-8">
              <Button variant="outline" onClick={handleClick}>
                Load more...
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <EditDialog
        open={createModalOpen}
        onClose={setCreateModalOpen}
        onEdit={handleOnEdit}
      />

      <UserCreateDialog
        open={createModalOpen}
        onClose={setCreateModalOpen}
        onCreateUser={handleOnCreateUser}
      />
    </div>
  );
};

export default Users;
