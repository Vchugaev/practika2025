import React from "react";
import { Row, Col, Card, Typography, Button, Badge, Divider } from "antd";
import {
  CarOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import styles from "./ServicesSection.module.css";

const { Title, Text } = Typography;

const ServicesSection = () => {
  const services = [
    {
      title: "Стандартная мойка",
      price: "800 ₽",
      time: "20-30 мин",
      features: ["Наружная мойка", "Очистка колес", "Сушка"],
      popular: false,
      icon: <CarOutlined />,
      color: "#1890ff",
    },
    {
      title: "Комплексная мойка",
      price: "1500 ₽",
      time: "40-50 мин",
      features: [
        "Полная мойка",
        "Обработка пластика",
        "Чистка стекол",
        "Ароматизация",
      ],
      popular: true,
      icon: <SafetyCertificateOutlined />,
      color: "#13c2c2",
    },
    {
      title: "Премиум уход",
      price: "3500 ₽",
      time: "1,5-2 часа",
      features: [
        "Комплексная мойка",
        "Полировка кузова",
        "Защитное покрытие",
        "Химчистка салона",
      ],
      popular: false,
      icon: <CrownOutlined />,
      color: "#722ed1",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Divider>
          <Title level={2} className={styles.title}>
            Наши услуги
          </Title>
        </Divider>
        <Text type="secondary" className={styles.subtitle}>
          Профессиональный уход для вашего автомобиля
        </Text>
      </div>

      <Row gutter={[24, 24]} className={styles.services}>
        {services.map((service, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className={`${styles.card} ${
                service.popular ? styles.popularCard : ""
              }`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {service.popular && (
                <div className={styles.popularBadge}>
                  <Badge
                    count="Популярно"
                    style={{
                      backgroundColor: service.color,
                      color: "#fff",
                    }}
                  />
                </div>
              )}

              <div className={styles.cardHeader}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    backgroundColor: `${service.color}20`,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <Title level={4} className={styles.cardTitle}>
                  {service.title}
                </Title>
              </div>

              <div className={styles.priceWrapper}>
                <Text strong className={styles.price}>
                  {service.price}
                </Text>
                <Text type="secondary" className={styles.time}>
                  {service.time}
                </Text>
              </div>

              <ul className={styles.features}>
                {service.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <StarOutlined className={styles.featureIcon} />
                    <Text>{feature}</Text>
                  </li>
                ))}
              </ul>

              <Button
                type="primary"
                block
                size="large"
                className={styles.button}
                style={{
                  background: service.color,
                  borderColor: service.color,
                }}
              >
                Записаться
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ServicesSection;
