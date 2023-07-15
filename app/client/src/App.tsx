import axios from "axios";
import { useState } from "react";
import UserList from "./components/UserList";
import Button from "./components/Button";
import AddUserPopup from "./components/Popup";
import { useUserData, UserData } from "./hooks/useUserData";
import "./App.css";

function App() {
  const { data, isLoading, refetch } = useUserData();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addUser = async (userData: UserData) => {
    try {
      await axios.post("http://localhost:5000/api/vartotojai", userData);
      refetch();
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Failed to add user");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/vartotojai/${id}`);
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        "Content is loading..."
      ) : (
        <>
          <header>
            <div className="addButtonWrap">
              <Button
                text={"Pridėti naują"}
                onClick={() => setIsPopupOpen(true)}
                className="addButton"
              />
            </div>
          </header>
          <main>
            <div className="table">
              <div className="top">
                <div>Vardas</div>
                <div>Pavardė</div>
                <div>El. paštas</div>
                <div>Amžius</div>
                <div></div>
                <div></div>
              </div>
              {data?.map((user: UserData) => (
                <UserList
                  key={user.email}
                  id={user._id}
                  fname={user.fname}
                  lname={user.lname}
                  email={user.email}
                  age={user.age}
                  onDelete={() => deleteUser(user._id)}
                />
              ))}
            </div>
          </main>
          <footer>
            <p>© 2023 Visos teisės saugomos</p>
          </footer>
        </>
      )}

      {isPopupOpen && (
        <AddUserPopup onClose={() => setIsPopupOpen(false)} onSave={addUser} />
      )}
    </>
  );
}

export default App;
