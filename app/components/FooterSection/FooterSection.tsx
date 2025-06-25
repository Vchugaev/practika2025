"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Input,
  Avatar,
  Badge,
  message,
  Popover,
  ConfigProvider,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  MailOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  CarOutlined,
} from "@ant-design/icons";
import styles from "./FooterSection.module.css";
import theme from "@/app/themeConfig";
import { useRouter } from "next/navigation";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const user = localStorage.getItem("carWashUser");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("carWashUser");
    setIsLoggedIn(false);
    setUserName("");
    message.success("Вы вышли из системы");
  };

  const userContent = (
    <div className={styles.userMenu}>
      <Text strong className={styles.userName}>
        {userName}
      </Text>
      <Button
        block
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Выйти
      </Button>
    </div>
  );

  return (
    <Footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Верхняя часть футера */}
        <Row gutter={[48, 32]} className={styles.topFooter}>
          {/* Колонка с контактами */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className={styles.footerTitle}>
              <CarOutlined style={{ color: "#13c2c2", marginRight: 8 }} />
              Автомойка "Чисто"
            </Title>
            <div className={styles.contactItem}>
              <EnvironmentOutlined className={styles.contactIcon} />
              <Text>г. Москва, ул. Автомойная, 12</Text>
            </div>
            <div className={styles.contactItem}>
              <PhoneOutlined className={styles.contactIcon} />
              <Link href="tel:+79991234567">+7 (999) 123-45-67</Link>
            </div>
            <div className={styles.contactItem}>
              <MailOutlined className={styles.contactIcon} />
              <Link href="mailto:info@chisto.ru">info@chisto.ru</Link>
            </div>
            <div className={styles.contactItem}>
              <ClockCircleOutlined className={styles.contactIcon} />
              <Text>Ежедневно 8:00 - 22:00</Text>
            </div>
          </Col>

          {/* Колонка с навигацией */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className={styles.footerTitle}>
              Навигация
            </Title>
            <Link href="#services" className={styles.footerLink}>
              Услуги
            </Link>
            <Link href="#about" className={styles.footerLink}>
              О нас
            </Link>
            <Link href="#reviews" className={styles.footerLink}>
              Отзывы
            </Link>
            <Link href="#contacts" className={styles.footerLink}>
              Контакты
            </Link>
            <Link href="#promo" className={styles.footerLink}>
              Акции
            </Link>
          </Col>

          {/* Колонка с пользователем и отзывами */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className={styles.footerTitle}>
              Аккаунт
            </Title>

            {isLoggedIn ? (
              <div className={styles.userSection}>
                <Badge>
                  <Avatar
                    onClick={() => router.push("/account")}
                    size="large"
                    icon={<UserOutlined />}
                    className={styles.userAvatar}
                  />
                </Badge>

                <Text className={styles.welcomeText}>
                  Добро пожаловать, {userName}!
                </Text>
              </div>
            ) : (
              <Link href="/register" className={styles.authLink}>
                <Button
                  type="dashed"
                  icon={<LoginOutlined />}
                  block
                  className={styles.authButton}
                >
                  Войти / Регистрация
                </Button>
              </Link>
            )}
          </Col>
        </Row>

        <Divider className={styles.footerDivider} />

        {/* Нижняя часть футера */}
        <Row
          justify="space-between"
          align="middle"
          className={styles.bottomFooter}
        >
          <Col>
            <Text className={styles.copyright}>
              © {new Date().getFullYear()} Автомойка "Чисто". Все права
              защищены.
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterSection;
