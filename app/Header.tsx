"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Grid,
  Space,
  Divider,
  theme,
  Avatar,
  Dropdown,
  Modal,
  Form,
  Input,
} from "antd";
import {
  CarOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;
const { Item } = Form;

const AppHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // По умолчанию показываем регистрацию
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Главная",
      href: "/",
    },
    {
      key: "services",
      icon: <ShoppingCartOutlined />,
      label: "Услуги",
      href: "#services",
    },
    {
      key: "reviews",
      icon: <StarOutlined />,
      label: "Отзывы",
      href: "#reviews",
    },
    {
      key: "about",
      icon: <InfoCircleOutlined />,
      label: "О нас",
      href: "#about",
    },
    {
      key: "contacts",
      icon: <PhoneOutlined />,
      label: "Контакты",
      href: "#contacts",
    },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Профиль
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => setIsLoggedIn(false)}
      >
        Выйти
      </Menu.Item>
    </Menu>
  );



  return (
    <>
      <AntHeader
        className={styles.header}
        style={{ background: colorBgContainer }}
      >
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <CarOutlined style={{ color: colorPrimary, fontSize: "28px" }} />
            <span className={styles.logoText}>Чисто</span>
          </div>

          {screens.md ? (
            <>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[]}
                className={styles.menu}
                items={menuItems.map((item) => ({
                  ...item,
                  label: <a href={item.href}>{item.label}</a>,
                }))}
              />

              <Space className={styles.actions}>
                {isLoggedIn ? (
                  <Dropdown overlay={userMenu} placement="bottomRight">
                    <Avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: colorPrimary,
                        cursor: "pointer",
                      }}
                    />
                  </Dropdown>
                ) : (
                  <Button
                    type="text"
                    icon={<LoginOutlined />}
                    onClick={() => router.push("/register")}
                  >
                    Войти
                  </Button>
                )}
                <Button
                  type="primary"
                  icon={<PhoneOutlined />}
                  className={styles.phoneButton}
                >
                  +7 (XXX) XXX-XX-XX
                </Button>
              </Space>
            </>
          ) : (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className={styles.mobileMenuButton}
            />
          )}
        </div>
      </AntHeader>

      {/* Мобильное меню */}
      <Drawer
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className={styles.mobileDrawer}
        closeIcon={<CloseOutlined style={{ color: "#fff", fontSize: 24 }} />}
      >
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLogo}>
            <CarOutlined style={{ color: colorPrimary, fontSize: "28px" }} />
            <span className={styles.logoText}>Чисто</span>
          </div>

          <Divider style={{ background: "#333" }} />

          <Menu
            theme="dark"
            mode="vertical"
            selectedKeys={[]}
            items={menuItems.map((item) => ({
              ...item,
              label: (
                <a href={item.href} onClick={() => setDrawerVisible(false)}>
                  {item.label}
                </a>
              ),
            }))}
            className={styles.verticalMenu}
          />

          <div className={styles.mobileActions}>
            {isLoggedIn ? (
              <Button
                type="text"
                block
                icon={<LogoutOutlined />}
                onClick={() => {
                  setIsLoggedIn(false);
                  setDrawerVisible(false);
                }}
              >
                Выйти
              </Button>
            ) : (
              <Button
                type="text"
                block
                icon={<LoginOutlined />}
                onClick={() => {
                  router.push("/register"); // Теперь открывает сразу регистрацию
                  setDrawerVisible(false);
                }}
              >
                Войти
              </Button>
            )}

            <Button
              type="primary"
              block
              icon={<PhoneOutlined />}
              className={styles.phoneButton}
            >
              Позвонить
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AppHeader;
