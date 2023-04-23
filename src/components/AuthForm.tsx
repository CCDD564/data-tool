import { Register, SignIn } from "@/utils/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};
const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome back!",
  subheader: "Enter your credentials",
  buttonText: "Sign In",
};

const initial = { nickName: "", email: "", password: "", repeatPassword: "" };

const AuthForm = ({ mode }: { mode: string }) => {
  const [formState, setFormState] = useState({ ...initial });
  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      if (mode === "register") {
        await Register(formState.nickName, formState.email, formState.password);
      } else {
        await SignIn(formState.email, formState.password);
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
    setFormState({ ...initial });
  };
  const content = mode === "register" ? registerContent : signinContent;
  return (
    <div className="registration-page">
      <form onSubmit={submitHandler}>
        {mode === "register" ? (
          <>
            <label>NickName</label>
            <input
              type="text"
              value={formState.nickName}
              onChange={(e) =>
                setFormState((s) => ({ ...s, nickName: e.target.value }))
              }
            />

            <label>Email</label>
            <input
              type="text"
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />

            <label>Password</label>
            <input
              type="password"
              value={formState.password}
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />

            <label>Repeat password</label>
            <input
              type="password"
              value={formState.repeatPassword}
              onChange={(e) =>
                setFormState((s) => ({ ...s, repeatPassword: e.target.value }))
              }
            />
          </>
        ) : (
          <>
            <label>Email</label>
            <input type="text" value={formState.email}></input>

            <label>Password</label>
            <input type="password" value={formState.password}></input>
          </>
        )}
        <button>{content.buttonText}</button>
        <span>
          <Link href={content.linkUrl}>{content.linkText}</Link>
        </span>
      </form>
    </div>
  );
};
export default AuthForm;
