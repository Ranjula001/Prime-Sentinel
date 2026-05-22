import Image from "next/image";
import Home from "./pages/home/home";
import Nav from "./navigation/nav";

export default function Page() {
  return (
    <>

    <div>
      <Nav />
    </div>

    <main className={`flex flex-col items-center justify-between p-10`}>

      <Home />

    </main>
    </>
  );
}
