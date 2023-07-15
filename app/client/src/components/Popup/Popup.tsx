import React, { useState } from "react";
import Button from "../Button";
import "./Popup.css";
import { UserData } from "../../hooks/useUserData";

type Props = {
  onClose: () => void;
  onSave: (userData: UserData) => Promise<void>;
};

const Popup = ({ onClose, onSave }: Props) => {
  const [userData, setUserData] = useState<UserData>({
    fname: "",
    lname: "",
    email: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  const updateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const saveUser = async () => {
    try {
      await onSave(userData);
      setMessage("Vartotojas pridėtas sėkmingai");
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Klaida pridedant");
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        {message ? (
          <>
            <div className="message">{message}</div>
            <Button
              text="uždaryti"
              onClick={onClose}
              className="popupButtons close"
            />
          </>
        ) : (
          <>
            <div className="input">
              <label>Vardas</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={userData.fname}
                onChange={updateChange}
              />
            </div>
            <div className="input">
              <label>Pavardė</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={userData.lname}
                onChange={updateChange}
              />
            </div>
            <div className="input">
              <label>El. paštas</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userData.email}
                onChange={updateChange}
              />
            </div>
            <div className="input">
              <label>Amžius</label>
              <input
                type="number"
                id="age"
                name="age"
                value={userData.age}
                onChange={updateChange}
              />
            </div>

            <Button
              text="Pridėti naują"
              onClick={saveUser}
              className="popupButtons"
            />
            <Button
              text="Atšaukti"
              onClick={onClose}
              className="popupButtons"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
