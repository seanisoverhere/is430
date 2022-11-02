import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  CenterContainer,
  ContentContainer,
  MobileContainer,
  NavContainer,
  Header,
} from "@/utils/styles";
import {
  AppOutline,
  BankcardOutline,
  UserOutline,
  BillOutline,
} from "antd-mobile-icons";
import { SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { StyledTabBar } from "@/utils/styles";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CenterContainer>
        <MobileContainer>
          <ContentContainer>
            {router.pathname !== "/login" && router.pathname !== "/signup" && (
              <Header>
                XBB SG <SettingOutlined style={{ fontSize: "1.25rem" }} />
              </Header>
            )}
            <Component {...pageProps} />
          </ContentContainer>
          {router.pathname !== "/login" && router.pathname !== "/signup" && (
            <NavContainer>
              <StyledTabBar onChange={(val) => router.push(val)}>
                {tabs.map((item) => (
                  <StyledTabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                  />
                ))}
              </StyledTabBar>
            </NavContainer>
          )}
        </MobileContainer>
      </CenterContainer>
    </>
  );
}

export default MyApp;
