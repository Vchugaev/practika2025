"use client";

import {
  Layout,
  Menu,
  Card,
  Statistic,
  List,
  Avatar,
  Typography,
  Button,
  Badge,
  Divider,
  Space,
  Drawer,
  Grid,
  Form,
  Input,
  Switch,
  Select,
  Table,
  Tag,
  Modal,
} from "antd";
import {
  UserOutlined,
  CarOutlined,
  HistoryOutlined,
  StarOutlined,
  LogoutOutlined,
  SafetyOutlined,
  CreditCardOutlined,
  MenuOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Account.module.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
const { Option } = Select;

type Order = {
  id: string;
  date: string;
  service: string;
  price: number;
  status: "completed" | "pending" | "cancelled";
  details?: string;
};

type PaymentMethod = {
  id: string;
  type: "card" | "qiwi" | "yoomoney";
  details: string;
  isDefault: boolean;
};

const AccountPage = () => {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordForm] = Form.useForm();
  const [addPaymentForm] = Form.useForm();
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const router = useRouter();
  const screens = useBreakpoint();

  useEffect(() => {
    const userData = localStorage.getItem("carWashUser");
    if (!userData) {
      router.push("/register");
      return;
    }

    setUser(JSON.parse(userData));

    const mockOrders: Order[] = [
      {
        id: "CH-2023-15672124",
        date: "2023-05-15T14:30:00",
        service: "Комплексная мойка + Полировка",
        price: 3500,
        status: "completed",
        details: "Мойка кузова, чистка салона, полировка воском",
      },
      {
        id: "CH-2023-1892",
        date: "2023-06-20T11:15:00",
        service: "Премиум уход с защитным покрытием",
        price: 5500,
        status: "pending",
        details: "Глубокая чистка, нанесение керамического покрытия",
      },
      {
        id: "CH-2023-2045",
        date: "2023-07-10T16:45:00",
        service: "Стандартная мойка",
        price: 1200,
        status: "completed",
        details: "Мойка кузова, чистка стекол, сушка",
      },
    ];
    setOrders(mockOrders);

    const mockPayments: PaymentMethod[] = [
      {
        id: "1",
        type: "card",
        details: "•••• •••• •••• 4242",
        isDefault: true,
      },
      {
        id: "2",
        type: "yoomoney",
        details: "user@yoomoney.ru",
        isDefault: false,
      },
    ];
    setPaymentMethods(mockPayments);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("carWashUser");
    router.push("/");
  };

  const handlePasswordChange = (values: any) => {
    // Здесь должна быть логика изменения пароля
    message.success("Пароль успешно изменен");
    setIsEditingPassword(false);
    passwordForm.resetFields();
  };

  const handleAddPaymentMethod = (values: any) => {
    const newPayment: PaymentMethod = {
      id: Date.now().toString(),
      type: values.type,
      details: values.details,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newPayment]);
    setIsPaymentModalVisible(false);
    addPaymentForm.resetFields();
    message.success("Способ оплаты добавлен");
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    message.success("Основной способ оплаты изменен");
  };

  const deletePaymentMethod = (id: string) => {
    if (
      paymentMethods.find((m) => m.id === id)?.isDefault &&
      paymentMethods.length > 1
    ) {
      message.error("Нельзя удалить основной способ оплаты");
      return;
    }

    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    message.success("Способ оплаты удален");
  };

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Профиль",
    },
    {
      key: "orders",
      icon: <HistoryOutlined />,
      label: "История заказов",
    },
    {
      key: "bonuses",
      icon: <StarOutlined />,
      label: "Бонусы",
    },
    {
      key: "payments",
      icon: <CreditCardOutlined />,
      label: "Способы оплаты",
    },
  ];

  const paymentColumns = [
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const types: Record<string, string> = {
          card: "Банковская карта",
          qiwi: "QIWI Кошелек",
          yoomoney: "ЮMoney",
        };
        return types[type] || type;
      },
    },
    {
      title: "Данные",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Статус",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (isDefault: boolean) =>
        isDefault ? <Tag color="green">Основной</Tag> : null,
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: PaymentMethod) => (
        <Space size="middle">
          {!record.isDefault && (
            <>
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => setDefaultPaymentMethod(record.id)}
                title="Сделать основным"
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deletePaymentMethod(record.id)}
                title="Удалить"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <Title level={3} className={styles.sectionTitle}>
              Мой профиль
            </Title>
            <Divider />

            <Space size="large" className={styles.statsRow}>
              <Card className={styles.statCard}>
                <Statistic
                  title="Всего заказов"
                  value={orders.length}
                  prefix={<CarOutlined />}
                />
              </Card>
              <Card className={styles.statCard}>
                <Statistic
                  title="Потрачено"
                  value={orders.reduce((sum, order) => sum + order.price, 0)}
                  prefix="₽"
                />
              </Card>
              <Card className={styles.statCard}>
                <Statistic
                  title="Бонусов"
                  value={orders.length * 50}
                  prefix={<StarOutlined />}
                />
              </Card>
            </Space>

            <Divider />

            <Card title="Личные данные" className={styles.infoCard}>
              <Space direction="vertical" size="middle">
                <div className={styles.infoRow}>
                  <Text strong>ФИО:</Text>
                  <Text>{user?.name}</Text>
                </div>
                <div className={styles.infoRow}>
                  <Text strong>Email:</Text>
                  <Text>{user?.email}</Text>
                </div>
                <div className={styles.infoRow}>
                  <Text strong>Телефон:</Text>
                  <Text>{user?.phone || "Не указан"}</Text>
                </div>
                <div className={styles.infoRow}>
                  <Text strong>Дата регистрации:</Text>
                  <Text>
                    {user?.registrationDate
                      ? new Date(user.registrationDate).toLocaleDateString()
                      : "Неизвестно"}
                  </Text>
                </div>
              </Space>
            </Card>
          </>
        );

      case "orders":
        return (
          <>
            <Title level={3} className={styles.sectionTitle}>
              История заказов
            </Title>
            <Divider />

            <div className={styles.ordersContainer}>
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className={`${styles.orderCard} ${styles[order.status]}`}
                  hoverable
                >
                  <div className={styles.orderHeader}>
                    <Space size="large">
                      <Text strong className={styles.orderId}>
                        Заказ #{order.id}
                      </Text>
                      <Badge
                        status={
                          order.status === "completed"
                            ? "success"
                            : order.status === "pending"
                            ? "processing"
                            : "error"
                        }
                        text={
                          order.status === "completed"
                            ? "Выполнен"
                            : order.status === "pending"
                            ? "В процессе"
                            : "Отменен"
                        }
                      />
                    </Space>
                    <Text type="secondary">
                      {new Date(order.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  </div>

                  <Divider className={styles.orderDivider} />

                  <div className={styles.orderBody}>
                    <div className={styles.serviceInfo}>
                      <CarOutlined className={styles.serviceIcon} />
                      <div>
                        <Text strong className={styles.serviceName}>
                          {order.service}
                        </Text>
                        <Text type="secondary">{order.details}</Text>
                      </div>
                    </div>

                    <div className={styles.orderDetails}>
                      <div className={styles.detailItem}>
                        <Text type="secondary">Стоимость:</Text>
                        <Text strong className={styles.price}>
                          {order.price.toLocaleString("ru-RU")} ₽
                        </Text>
                      </div>
                      <div className={styles.detailItem}>
                        <Text type="secondary">Начислено бонусов:</Text>
                        <Text strong>
                          50 <StarOutlined />
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        );

      case "bonuses":
        return (
          <>
            <Title level={3} className={styles.sectionTitle}>
              Бонусная программа
            </Title>
            <Divider />

            <Card className={styles.bonusCard}>
              <Statistic
                title="Ваши бонусы"
                value={orders.length * 50}
                prefix={<StarOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
              <Divider />
              <Text>1 бонус = 1 рубль</Text>
              <Text type="secondary">
                Накопленные бонусы можно использовать для оплаты до 50% от суммы
                заказа
              </Text>
              <Divider />
              <Button type="primary">Как получить больше бонусов?</Button>
            </Card>
          </>
        );

      case "payments":
        return (
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Title level={3} style={{ marginBottom: 0 }}>
              Способы оплаты
            </Title>
            <Divider style={{ marginTop: 16 }} />

            <Card
              title="Мои способы оплаты"
              style={{ marginTop: 24 }}
              headStyle={{ fontSize: 16, fontWeight: 500 }}
            >
              <Table
                columns={paymentColumns}
                dataSource={paymentMethods}
                rowKey="id"
                pagination={false}
                locale={{ emptyText: "Нет добавленных способов оплаты" }}
                style={{ marginTop: -16 }}
              />
            </Card>
          </div>
        );

      default:
        return (
          <Card className={styles.infoCard}>
            <Title level={4}>
              {menuItems.find((item) => item.key === activeTab)?.label}
            </Title>
            <Text>Раздел в разработке</Text>
          </Card>
        );
    }
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <Text>Загрузка данных...</Text>
        </div>
      </div>
    );
  }

  return (
    <Layout className={styles.layout}>
      {/* Мобильный хедер */}
      {!screens.md && (
        <Header className={styles.mobileHeader}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(true)}
            className={styles.menuButton}
          />
          <Title level={4} className={styles.mobileTitle}>
            Мой аккаунт
          </Title>
        </Header>
      )}

      {/* Боковое меню для десктопа */}
      {screens.md && (
        <Sider width={250} className={styles.sider}>
          <div className={styles.userPanel}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className={styles.avatar}
            />
            <Title level={4} className={styles.userName}>
              {user.name}
            </Title>
            <Text type="secondary">{user.email}</Text>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[activeTab]}
            onSelect={({ key }) => setActiveTab(key)}
            className={styles.menu}
            items={menuItems}
          />

          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Выйти
          </Button>
        </Sider>
      )}

      {/* Мобильное меню (Drawer) */}
      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <Avatar
              size={48}
              icon={<UserOutlined />}
              className={styles.avatar}
            />
            <div>
              <Text strong>{user.name}</Text>
              <Text type="secondary" style={{ display: "block" }}>
                {user.email}
              </Text>
            </div>
          </div>
        }
        placement="left"
        closable={true}
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        className={styles.mobileDrawer}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onSelect={({ key }) => {
            setActiveTab(key);
            setMobileMenuVisible(false);
          }}
          className={styles.mobileMenu}
          items={menuItems}
        />

        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block
          className={styles.mobileLogoutButton}
        >
          Выйти
        </Button>
      </Drawer>

      <Layout className={styles.contentLayout}>
        <Content className={styles.content}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
