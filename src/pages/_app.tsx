import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CenterContainer, MobileContainer, NavContainer } from "@/utils/styles";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  BankcardOutline,
  UserOutline,
  BillOutline,
} from "antd-mobile-icons";
import { useRouter } from "next/router";

const tabs = [
  {
    key: "/",
    title: "Home",
    icon: <AppOutline />,
  },
  {
    key: "loans",
    title: "Loans",
    icon: <BankcardOutline />,
  },
  {
    key: "payments",
    title: "Payments",
    icon: <BillOutline />,
  },
  {
    key: "profile",
    title: "Profile",
    icon: <UserOutline />,
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Xchange In B2B</title>
        <meta name="description" content="XBB B2B App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenterContainer>
        <MobileContainer>
          <Component {...pageProps} />
          {router.pathname !== "/login" && (
            <NavContainer>
              <TabBar onChange={(val) => router.push(val)}>
                {tabs.map((item) => (
                  <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                  />
                ))}
              </TabBar>
            </NavContainer>
          )}
        </MobileContainer>
      </CenterContainer>
    </>
  );
}

export default MyApp;
