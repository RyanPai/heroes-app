import { redirect } from "react-router";

// 將根路徑導向 /heroes，作為進站預設入口
export function clientLoader() {
  return redirect("/heroes");
}

export default function Home() {
  return null;
}
