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
  Checkbox,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import theme from "../themeConfig";

const { Title, Text } = Typography;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  registrationDate: string;
}

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);

      if (!values.agreeToTerms) {
        throw new Error("Вы должны принять условия обслуживания");
      }

      if (values.password !== values.confirmPassword) {
        throw new Error("Пароли не совпадают");
      }

      const existingUsers: User[] = JSON.parse(
        localStorage.getItem("carWashUsers") || "[]"
      );
      const userExists = existingUsers.some(
        (user) => user.email === values.email
      );

      if (userExists) {
        throw new Error("Пользователь с таким email уже зарегистрирован");
      }

      const newUser: User = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        registrationDate: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("carWashUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("carWashUser", JSON.stringify(newUser));

      message.success("Регистрация прошла успешно!");
      router.push("/account");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Ошибка при регистрации"
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
              Регистрация в автомойке "Чисто"
            </Title>
            <Text type="secondary">
              Создайте аккаунт для записи онлайн и получения скидок
            </Text>
          </Space>

          <Divider className={styles.divider} />

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="name"
              label="ФИО"
              rules={[
                { required: true, message: "Пожалуйста, введите ваше имя" },
                { min: 3, message: "Имя должно содержать минимум 3 символа" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иванов Иван Иванович"
                size="large"
              />
            </Form.Item>

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
              name="phone"
              label="Телефон"
              rules={[
                { required: true, message: "Пожалуйста, введите ваш телефон" },
                {
                  pattern: /^\+?[\d\s\-\(\)]+$/,
                  message: "Введите корректный телефон",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="+7 (999) 123-45-67"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль" },
                {
                  min: 6,
                  message: "Пароль должен содержать минимум 6 символов",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Не менее 6 символов"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Подтвердите пароль"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Пожалуйста, подтвердите пароль" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Повторите пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="agreeToTerms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Вы должны принять условия")),
                },
              ]}
            >
              <Checkbox>
                Я согласен с{" "}
                <Link href="/terms" className={styles.link}>
                  условиями обслуживания
                </Link>{" "}
                и{" "}
                <Link href="/privacy" className={styles.link}>
                  политикой конфиденциальности
                </Link>
              </Checkbox>
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
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>

          <Divider className={styles.divider} />

          <Space direction="vertical" size="middle" className={styles.footer}>
            <Text>
              Уже есть аккаунт?{" "}
              <Link href="/login" className={styles.link}>
                Войдите
              </Link>
            </Text>
            <Text type="secondary" className={styles.helpText}>
              Регистрируясь, вы получаете доступ к личному кабинету, истории
              заказов и бонусной программе.
            </Text>
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default RegisterPage;