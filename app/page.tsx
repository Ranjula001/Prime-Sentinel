import Image from "next/image";
import Home from "./pages/home/home";
import Nav from "./navigation/nav";

export default function Page() {
  return (
    <>
      <Nav />
      <div>
        <Home />
      </div>
    </>
  );
}
