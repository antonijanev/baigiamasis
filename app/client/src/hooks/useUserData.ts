import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  age: number;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useUserData() {
  return useQuery<UserData[], Error>(["repoData"], async () => {
    await wait(1000);
    const { data } = await axios.get("http://localhost:5000/api/vartotojai");
    return data;
  });
}
export default useUserData;
