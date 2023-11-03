import NavBarLogin from "@/components/NavBarLogin";

import { LoginForm } from "../components/LoginForm";

export default function Home() {
  return (
    <main>
      <NavBarLogin />
      <section
        className="font-primary text-fetch h-screen w-screen flex 
        justify-center items-center "
      >
        <div
          className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white 
          rounded-xl space-y-12 relative z-0"
        >
          <h1 className="font-semibold text-2xl">
            Welcome. <span className="text-orange-600">Fetch</span> Your Dog!
          </h1>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
