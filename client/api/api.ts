// import axios from "axios";
// import { useUserData, UserData } from "../../app/client/src/hooks/useUserData";
// const { refetch } = useUserData();

// export const addUser = async (userData: UserData) => {
//   try {
//     await axios.post("http://localhost:5000/api/vartotojai", userData);
//     refetch(); // Fetch the updated data from the server
//   } catch (error) {
//     console.error("Error adding user:", error);
//     throw new Error("Failed to add user"); // Throw an error when there's an issue
//   }
// };

// export const handleDeleteUser = async (id: string) => {
//   try {
//     await axios.delete(`http://localhost:5000/api/vartotojai/${id}`);
//     refetch(); // Fetch the updated data from the server
//   } catch (error) {
//     console.error("Error deleting user:", error);
//   }
// };
