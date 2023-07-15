import React, { useState, useEffect } from "react";
import "./UserList.css";
import Button from "../Button";
import axios from "axios";

type Props = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  age: number;
  onDelete: () => Promise<void>;
};

const UserList = ({ id, fname, lname, email, age, onDelete }: Props) => {
  const [editValues, setEditValues] = useState({
    fname,
    lname,
    email,
    age,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);

  const edit = () => {
    setIsEditing(true);
  };

  const save = async () => {
    setIsEditing(false);
    try {
      await axios.put(`http://localhost:5000/api/vartotojai/${id}`, editValues);
    } catch (error) {
      console.error("Error updating values:", error);
    }
  };

  const cancel = () => {
    setIsEditing(false);
    setEditValues({ fname, lname, email, age });
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    setDeleteClick(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteClick(false);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteClick(false);
  };

  useEffect(() => {
    setEditValues({ fname, lname, email, age });
  }, [fname, lname, email, age]);

  return (
    <div className="users">
      <div>
        {isEditing ? (
          <input
            type="text"
            name="fname"
            value={editValues.fname}
            onChange={change}
          />
        ) : (
          `${editValues.fname}`
        )}
      </div>
      <div>
        {isEditing ? (
          <input
            type="text"
            name="lname"
            value={editValues.lname}
            onChange={change}
          />
        ) : (
          `${editValues.lname}`
        )}
      </div>
      <div>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editValues.email}
            onChange={change}
          />
        ) : (
          `${editValues.email}`
        )}
      </div>
      <div>
        {isEditing ? (
          <input
            type="number"
            name="age"
            value={editValues.age}
            onChange={change}
          />
        ) : (
          `${editValues.age}`
        )}
      </div>
      {deleteClick ? (
        <div className="confirmation">
          <p>Ar tikrai norite ištrinti?</p>
          <div>
            <Button
              text="Taip"
              onClick={handleConfirmDelete}
              className="confirmButton"
            />
            <Button
              text="Atšaukti"
              onClick={handleCancelDelete}
              className="cancelButton"
            />
          </div>
        </div>
      ) : (
        <>
          {isEditing ? (
            <>
              <Button
                text="Išsaugoti"
                onClick={save}
                className="tableButton buttonLeft"
              />
              <Button
                text="Atšaukti"
                onClick={cancel}
                className="tableButton buttonRight"
              />
            </>
          ) : (
            <>
              <Button
                text="Redaguoti"
                onClick={edit}
                className="tableButton buttonLeft"
              />
              <Button
                text="Ištrinti"
                onClick={handleDelete}
                className="tableButton buttonRight"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
