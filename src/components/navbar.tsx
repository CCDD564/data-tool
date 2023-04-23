import { GetUser } from "@/utils/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const getData = async () => {
  const { data: user, error } = await GetUser();
  return user;
};

const Navbar = () => {
  const links = [
    { label: "Home", link: "/" },
    { label: "Posts", link: "/posts" },
    { label: "My Posts", link: "/myposts" },
    { label: "Trending", link: "/trending" },
  ];

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getData().then((value) => {
      setUser(value);
    });
    console.log(user);
  }, [user]);
  return (
    <div className="nav">
      <h4>Navbar</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.link}>{link.label}</Link>
          </li>
        ))}
        {user ? (
          <li>
            <Link href="/">Log out</Link>
          </li>
        ) : (
          <li>
            <Link href="/register">Register</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
