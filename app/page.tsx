"use client";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Divider,
  Steps,
  Flex,
  Grid,
  Layout,
  Typography,
  theme,
  Carousel,
  Rate,
  Statistic,
  Menu,
  Drawer,
} from "antd";
import Image from "next/image";
import {
  SmileOutlined,
  CarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  WalletOutlined,
  EnvironmentOutlined,
  WifiOutlined,
  EnvironmentFilled,
  CalendarOutlined,
  QuestionOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;
const { Step } = Steps;
const { useBreakpoint } = Grid;
const { useToken } = theme;

export default function Home() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: screens.md ? "0 48px" : "0 16px",
          height: 64,
          background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #1890ff 100%)`,
          boxShadow: token.boxShadow,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Логотип и бургер-меню */}
        <div
         
          style={{ display: "flex", alignItems: "center", gap: token.margin }}
        >
          {!screens.md && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: "white", fontSize: 20 }} />}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: token.marginSM,
              cursor: "pointer",
            }}
          >
            <Title
              level={4}
              onClick={() => scrollToSection("homes")}
              style={{
                color: "white",
                margin: 0,
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.12)",
                background: "linear-gradient(to right, #fff, #f0f0f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              ЧИСТО<span style={{ fontSize: "0.8em" }}>™</span>
            </Title>
          </div>
        </div>

        {/* Основное меню (десктоп) */}
        {screens.md && (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              background: "transparent",
              borderBottom: "none",
              flex: 1,
              minWidth: 0,
              justifyContent: "center",
            }}
            items={[
              {
                key: "1",
                label: "Главная",
                icon: <HomeOutlined />,
                onClick: () => scrollToSection("homes"),
              },
              {
                key: "2",
                label: "Услуги",
                icon: <CarOutlined />,
                onClick: () => scrollToSection("services"),
              },
              {
                key: "3",
                label: "Цены",
                icon: <DollarOutlined />,
                onClick: () => scrollToSection("prices"),
              },
              {
                key: "4",
                label: "Контакты",
                icon: <PhoneOutlined />,
                onClick: () => scrollToSection("contacts"),
              },
            ]}
          />
        )}

        {/* Кнопки действий */}
        <Space size="middle">
          {screens.md ? (
            <>
              <Button
                type="text"
                style={{ color: "white" }}
                icon={<QuestionOutlined />}
                onClick={() => scrollToSection("faq")}
              >
                Помощь
              </Button>
            </>
          ) : (
            <Button
              type="text"
              style={{ color: "white" }}
              icon={<QuestionOutlined />}
              onClick={() => scrollToSection("faq")}
            />
          )}
        </Space>

        {/* Мобильное меню (выпадающее) */}
        {!screens.md && (
          <Drawer
            title="Меню"
            placement="left"
            closable={true}
            onClose={() => setMenuOpen(false)}
            open={menuOpen}
            width={250}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              theme="light"
              mode="vertical"
              items={[
                { key: "1", label: "Главная", icon: <HomeOutlined />, onClick: () => scrollToSection("homes") },
                { key: "2", label: "Услуги", icon: <CarOutlined />, onClick: () => scrollToSection("services") },
                { key: "3", label: "Цены", icon: <DollarOutlined />, onClick: () => scrollToSection("prices") },
                { key: "4", label: "Контакты", icon: <PhoneOutlined />, onClick: () => scrollToSection("contacts") },
                {
                  key: "5",
                  label: "Помощь",
                  icon: <QuestionOutlined />,
                  style: { marginTop: token.margin },
                  onClick: () => scrollToSection("faq"),
                },
              ]}
            />
          </Drawer>
        )}
      </Header>

      <Content style={{ padding: "0 48px" }}>
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            height: "500px",
            borderRadius: token.borderRadiusLG,
            overflow: "hidden",
            marginBottom: 24,
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          {/* Фоновое изображение */}
          <Image
            src="/wash2.gif" // Укажите правильный путь к вашему изображению
            alt="Фон автомойки"
            fill
            style={{
              objectFit: "cover",
              zIndex: 0,
            }}
            priority
          />

          {/* Затемнение фона для лучшей читаемости текста */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />

          {/* Контент поверх изображения */}
          <div
           id="homes"
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <Title level={2} style={{ color: "white" }}>
              Автомойка „Чисто™“ — быстро, дешево, без царапин (почти)
            </Title>
            <Paragraph style={{ color: "white", maxWidth: "800px" }}>
              Моем машины с 2025 года. Если после нас останутся царапины — это
              не мы (наверное).
            </Paragraph>
            <Button type="primary" size="large">
              Записаться
            </Button>
          </div>
        </div>
        <Divider />
        <div
          style={{
            background: token.colorFillAlter,
            padding: token.paddingLG * 2,
            borderRadius: token.borderRadiusLG,
            marginBottom: token.marginLG,
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            О нашей философии чистоты
          </Title>
          <Paragraph
            style={{ textAlign: "center", fontSize: token.fontSizeLG }}
          >
            Мы верим, что чистая машина — это не роскошь, а необходимость для
            тех, кто не хочет ездить на "посуде" из грязи. Наша миссия — сделать
            ваш автомобиль настолько чистым, чтобы соседи завидовали, а прохожие
            останавливались, чтобы сделать селфи.
          </Paragraph>
          <Paragraph
            style={{ textAlign: "center", fontSize: token.fontSizeLG }}
          >
            Используем только проверенные методы: от традиционного
            "помыть-полить" до инновационного "почесать-погладить". Результат
            гарантируем — если не понравится, мы... ну, вы знаете, где мы
            находимся.
          </Paragraph>
        </div>
        {/* Преимущества */}
        <Flex
          vertical
          gap={token.sizeLG}
          id="services"
          style={{
            marginBottom: token.marginLG,
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          <Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            Почему мы?
          </Title>

          <Row
            gutter={[
              { xs: token.sizeSM, sm: token.size, md: token.sizeLG },
              token.size,
            ]}
          >
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                styles={{
                  body: { padding: token.paddingSM },
                }}
              >
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: "100%" }}
                >
                  <ThunderboltOutlined
                    style={{
                      fontSize: token.fontSizeXL,
                      color: token.colorWarning,
                    }}
                  />
                  <Text strong>Быстро</Text>
                  <Text type="secondary">15 минут, если не курим</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: "100%" }}
                >
                  <WalletOutlined
                    style={{
                      fontSize: token.fontSizeXL,
                      color: token.colorSuccess,
                    }}
                  />
                  <Text strong>Дешево</Text>
                  <Text type="secondary">500 ₽, если платите наличкой</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: "100%" }}
                >
                  <EnvironmentOutlined
                    style={{
                      fontSize: token.fontSizeXL,
                      color: token.colorInfo,
                    }}
                  />
                  <Text strong>Без воды</Text>
                  <Text type="secondary">Экологично (шутка, воды много)</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: "100%" }}
                >
                  <WifiOutlined
                    style={{
                      fontSize: token.fontSizeXL,
                      color: token.colorError,
                    }}
                  />
                  <Text strong>Wi-Fi</Text>
                  <Text type="secondary">
                    В очереди есть, но он не работает
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Flex>

        <Divider style={{ margin: `${token.sizeXL}px 0` }} />
        <Divider />
        <div
          style={{
            padding: token.paddingLG,
            marginBottom: token.marginLG,
          }}
        >
          <Title level={4} style={{ textAlign: "center" }}>
            "Чисто™" — это не просто название, это обещание
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            Каждая капля воды у нас работает на ваш комфорт. Каждая пена — это
            произведение искусства. Каждая тряпка — инструмент в руках мастера
            (если ее не забыли в углу).
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            Мы не экономим на качестве, потому что не знаем, как это делать.
            Поэтому просто делаем хорошо — или как получится.
          </Paragraph>
        </div>
        {/* Услуги - улучшенная версия */}
        <Flex
          vertical
          id="prices"
          gap={token.sizeLG}
          style={{ margin: "16px auto", maxWidth: "1440px" }}
        >
          <Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            Наши услуги
          </Title>

          <Row gutter={[token.sizeLG, token.size]}>
            <Col xs={24} md={12}>
              <Card
                hoverable
                actions={[
                  <Button type="primary" block icon={<CarOutlined />}>
                    Выбрать
                  </Button>,
                ]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Flex align="center" gap={token.sizeSM}>
                    <CarOutlined
                      style={{
                        fontSize: token.fontSizeXL,
                        color: token.colorWarning,
                      }}
                    />
                    <Text strong>Стандартная мойка</Text>
                  </Flex>
                  <Text>500 ₽ — помыли, полить не забыли</Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                actions={[
                  <Button type="primary" block icon={<CrownOutlined />}>
                    Выбрать
                  </Button>,
                ]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Flex align="center" gap={token.sizeSM}>
                    <CrownOutlined
                      style={{
                        fontSize: token.fontSizeXL,
                        color: token.colorWarning,
                      }}
                    />
                    <Text strong>Премиум мойка</Text>
                  </Flex>
                  <Text>1500 ₽ — помыли и почесали</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Flex>

        <Divider />
        <div
          style={{
            padding: `${token.sizeLG}px 0`,
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          <Row gutter={[token.sizeXL, token.sizeXL]} align="middle">
            {/* Отзывы (левая часть) */}
            <Col xs={24} md={12}>
              <Title
                level={3}
                style={{ textAlign: screens.md ? "left" : "center" }}
              >
                Что говорят клиенты
              </Title>
              <Carousel
                autoplay
                dotPosition={screens.md ? "right" : "bottom"}
                style={{ padding: `${token.size}px 0` }}
              >
                <Card style={{ background: "transparent" }}>
                  <Space direction="vertical">
                    <Text italic style={{ fontSize: token.fontSizeLG }}>
                      "Лучшая мойка! Машина блестит как новая."
                    </Text>
                    <Text strong>- Иван, BMW X5</Text>
                    <Rate disabled defaultValue={5} />
                  </Space>
                </Card>
                <Card style={{ background: "transparent" }}>
                  <Space direction="vertical">
                    <Text italic style={{ fontSize: token.fontSizeLG }}>
                      "Быстро и недорого. Wi-Fi правда не работает."
                    </Text>
                    <Text strong>- Ольга, Kia Rio</Text>
                    <Rate disabled defaultValue={4} />
                  </Space>
                </Card>
              </Carousel>
            </Col>

            {/* Статистика (правая часть) */}
            <Col xs={24} md={12}>
              <Title
                level={3}
                style={{ textAlign: screens.md ? "left" : "center" }}
              >
                Наши результаты
              </Title>
              <Row gutter={[token.sizeLG, token.sizeLG]}>
                <Col xs={12}>
                  <Statistic
                    title="Машин помыто"
                    value={1128}
                    prefix={<CarOutlined />}
                    valueStyle={{ color: token.colorPrimary }}
                  />
                </Col>
                <Col xs={12}>
                  <Statistic
                    title="Среднее время"
                    value={15}
                    suffix="мин"
                    valueStyle={{ color: token.colorSuccess }}
                  />
                </Col>
                <Col xs={12}>
                  <Statistic
                    title="Довольных клиентов"
                    value={98}
                    suffix="%"
                    valueStyle={{ color: token.colorWarning }}
                  />
                </Col>
                <Col xs={12}>
                  <Statistic
                    title="Лет работы"
                    value={3}
                    prefix={<EnvironmentFilled />}
                    valueStyle={{ color: token.colorError }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <Divider style={{ margin: `${token.sizeXL}px 0` }} />

        <div
          style={{
            padding: "24px 0",
            background: "#f5f5f5",
            borderRadius: "8px",
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Как мы работаем
          </Title>
          <Row gutter={16} style={{ marginTop: "40px" }}>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <SmileOutlined
                    style={{
                      fontSize: "48px",
                      color: "#1890ff",
                      margin: "24px 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title="1. Запись"
                  description="Через сайт, телефон или просто приезжайте"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <CarOutlined
                    style={{
                      fontSize: "48px",
                      color: "#1890ff",
                      margin: "24px 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title="2. Мойка"
                  description="Быстро и качественно (иногда)"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <DollarOutlined
                    style={{
                      fontSize: "48px",
                      color: "#1890ff",
                      margin: "24px 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title="3. Оплата"
                  description="Наличные или карта (но лучше наличные)"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                cover={
                  <CheckCircleOutlined
                    style={{
                      fontSize: "48px",
                      color: "#52c41a",
                      margin: "24px 0",
                    }}
                  />
                }
              >
                <Card.Meta
                  title="4. Готово"
                  description="Ваша машина сияет (или почти сияет)"
                />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Steps
            current={-1}
            responsive={true}
            size="small"
            style={{ maxWidth: "800px", margin: "0 auto 40px" }}
          >
            <Step
              title="Запись"
              description="Онлайн или по телефону"
              icon={<SmileOutlined style={{ color: "#1890ff" }} />}
            />
            <Step
              title="Приезд"
              description="К назначенному времени"
              icon={<CarOutlined style={{ color: "#1890ff" }} />}
            />
            <Step
              title="Оплата"
              description="После выполнения работы"
              icon={<DollarOutlined style={{ color: "#1890ff" }} />}
            />
            <Step
              title="Готово"
              description="Чисто и с улыбкой"
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Steps>
        </div>
        <Divider />
        <div
          id="faq"
          style={{
            padding: token.paddingLG * 2,
            margin: "16px auto",
            maxWidth: "1440px",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            FAQ
          </Title>
          <Row gutter={[token.sizeLG, token.size]}>
            <Col xs={24} md={12}>
              <Card title="Почему у вас нет химчистки?">
                <Text>
                  Потому что мы специализируемся на том, что умеем делать хорошо
                  — мыть. Если бы мы умели чистить салоны, мы бы назывались
                  "Чисто-Салон™", но это уже следующая франшиза.
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Почему Wi-Fi не работает?">
                <Text>
                  Он работает, просто очень избирательно. Попробуйте сесть ближе
                  к окну, встать на одну ногу или вспомнить пароль. В крайнем
                  случае — помойте телефон, вдруг поможет.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
        <Divider />
        <div
          style={{
            padding: token.paddingLG,
            background: token.colorPrimaryBg,
            borderRadius: token.borderRadiusLG,
            marginBottom: token.marginLG,
          }}
        >
          <Paragraph style={{ textAlign: "center", fontWeight: "bold" }}>
            Не нашли ответ на свой вопрос?
          </Paragraph>
          <Paragraph style={{ textAlign: "center" }}>
            Мы всегда на связи — если, конечно, не моем машину, не пьем кофе или
            не прячемся от особо настойчивых клиентов. Но обычно мы на месте!
          </Paragraph>
        </div>
        {/* Контакты - улучшенная версия */}
        <Flex vertical align="center" id="contacts" gap={token.size}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Контакты
          </Title>

          <Space direction="vertical" align="center">
            <Flex align="center" gap={token.sizeSM}>
              <PhoneOutlined style={{ color: token.colorError }} />
              <Text>
                г. Москва, ул. Мокрая, д. 5 (напротив ларька с шаурмой)
              </Text>
            </Flex>

            <Flex align="center" gap={token.sizeSM}>
              <PhoneOutlined style={{ color: token.colorPrimary }} />
              <Text>+7 (800) 555-35-35</Text>
            </Flex>
          </Space>
        </Flex>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ©2025 Автомойка "Чисто™".
        <Text type="secondary">
          <br />
          "Чистота — наше всё. Ну, кроме зарплаты, конечно."
          <br />
          ИП Шаталова Н.А., ОГРНИП: 1234567890123 (если вдруг кому-то важно)
        </Text>
      </Footer>
    </Layout>
  );
}
