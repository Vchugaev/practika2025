"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Divider,
  Space,
  message,
  ConfigProvider,
} from "antd";
import { MailOutlined, LockOutlined, CarOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import theme from "../themeConfig";

const { Title, Text } = Typography;

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);

      const existingUsers: any[] = JSON.parse(
        localStorage.getItem("carWashUsers") || "[]"
      );
      const user = existingUsers.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (!user) {
        throw new Error("Неверный email или пароль");
      }

      localStorage.setItem("carWashUser", JSON.stringify(user));
      message.success("Вход выполнен успешно!");
      router.push("/account");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Ошибка при входе в систему"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Space direction="vertical" size="middle" className={styles.header}>
            <CarOutlined className={styles.logoIcon} />
            <Title level={3} className={styles.title}>
              Вход в аккаунт автомойки "Чисто"
            </Title>
            <Text type="secondary">
              Войдите, чтобы управлять записями и получать бонусы
            </Text>
          </Space>

          <Divider className={styles.divider} />

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Пожалуйста, введите ваш email" },
                { type: "email", message: "Введите корректный email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.ru"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Введите ваш пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className={styles.submitButton}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>

          <Divider className={styles.divider} />

          <Space direction="vertical" size="middle" className={styles.footer}>
            <Text>
              Нет аккаунта?{" "}
              <Link href="/register" className={styles.link}>
                Зарегистрируйтесь
              </Link>
            </Text>
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;