import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CenterContainer, MobileContainer, NavContainer } from "@/utils/styles";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  UnorderedListOutline,
  MessageOutline,
  UserOutline,
} from "antd-mobile-icons";

const tabs = [
  {
    key: "home",
    title: "Home",
    icon: <AppOutline />,
  },
  {
    key: "todo",
    title: "Loans",
    icon: <UnorderedListOutline />,
  },
  {
    key: "message",
    title: "Payments",
    icon: <MessageOutline />,
  },
  {
    key: "personalCenter",
    title: "Profile",
    icon: <UserOutline />,
  },
];

function MyApp({ Component, pageProps }: AppProps) {
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
          <NavContainer>
            <TabBar>
              {tabs.map((item) => (
                <TabBar.Item
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                />
              ))}
            </TabBar>
          </NavContainer>
        </MobileContainer>
      </CenterContainer>
    </>
  );
}

export default MyApp;
