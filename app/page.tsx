"use client";

import React from "react";
import {
  Layout,
  Carousel,
  Card,
  Button,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Statistic,
  List,
  Avatar,
  Badge,
} from "antd";
import {
  StarFilled,
  CheckCircleFilled,
  EnvironmentFilled,
  ClockCircleFilled,
  PhoneFilled,
  CarFilled,
  SafetyCertificateFilled,
} from "@ant-design/icons";
import Header from "./Header";
import styles from "./HomePage.module.css";
import ServicesSection from "./components/servicesSection/ServicesSection";
import StatsSection from "./components/StatsSection/StatsSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import FooterSection from "./components/FooterSection/FooterSection";

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const HomePage: React.FC = () => {
  // Данные для карусели
  const carouselItems = [
    {
      title: "Профессиональная мойка вашего авто",
      description: "Используем только качественные материалы и оборудование",
      image: "/wash.gif",
    },
    {
      title: "Бесплатная химчистка салона",
      description: "При заказе полного комплекса услуг",
      image: "/wash2.gif",
    },
    {
      title: "Скидка 20% новым клиентам",
      description: "По промокоду ЧИСТО20 при первом визите",
      image: "/wash3.gif",
    },
  ];

  // Преимущества
  const features = [
    {
      title: "Качественные материалы",
      description: "Используем только профессиональную автохимию",
      icon: <CheckCircleFilled />,
    },
    {
      title: "Быстро и удобно",
      description: "Среднее время мойки всего 30 минут",
      icon: <ClockCircleFilled />,
    },
    {
      title: "Удобное расположение",
      description: "Находимся в центре города с удобным подъездом",
      icon: <EnvironmentFilled />,
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Header />

      <Content>
        {/* Герой-секция с каруселью */}
        <section className={styles.heroSection}>
          <Carousel autoplay effect="fade" className={styles.carousel}>
            {carouselItems.map((item, index) => (
              <div key={index} className={styles.carouselItem}>
                <div className={styles.carouselContent}>
                  <Title level={1} className={styles.carouselTitle}>
                    {item.title}
                  </Title>
                  <Text className={styles.carouselText}>
                    {item.description}
                  </Text>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    className={styles.heroButton}
                  >
                    Записаться онлайн
                  </Button>
                </div>
                <div
                  className={styles.carouselImage}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Секция услуг */}
        <div id="services"></div>

        <ServicesSection />
        {/* Секция статистики */}
        <StatsSection />
        <div id="about"></div>
        {/* Секция преимуществ */}
        <section className={styles.section}>
          <Divider orientation="center">
            <Title level={2} className={styles.sectionTitle}>
              Почему выбирают нас
            </Title>
          </Divider>

          <Row gutter={[48, 24]} className={styles.featuresRow}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <Title level={4} className={styles.featureTitle}>
                    {feature.title}
                  </Title>
                  <Text className={styles.featureText}>
                    {feature.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </section>
        <div id="reviews"></div>
        {/* Секция отзывов */}
        <ReviewsSection />
        <div id="contacts"></div>
        {/* Секция CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <Title level={2} className={styles.ctaTitle}>
              Готовы привести авто в идеальное состояние?
            </Title>
            <Text className={styles.ctaText}>
              Оставьте заявку и мы подберём удобное время для визита
            </Text>

            <Space size="large" className={styles.ctaButtons}>
              <Button
                type="primary"
                size="large"
                icon={<PhoneFilled />}
                className={styles.ctaButton}
              >
                Позвонить
              </Button>
              <Button
                type="default"
                size="large"
                className={styles.ctaButtonSecondary}
              >
                Онлайн-запись
              </Button>
            </Space>
          </div>
        </section>
      </Content>

      <FooterSection />
    </Layout>
  );
};

export default HomePage;
