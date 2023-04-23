import Layout from "@/components/layout";
import "../styles/main.css";
import type { AppProps } from "next/app";
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
