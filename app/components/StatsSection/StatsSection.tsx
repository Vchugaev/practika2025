"use client";
import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Card } from "antd";
import {
  CarOutlined,
  ClockCircleOutlined,
  StarFilled,
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styles from "./StatsSection.module.css";

const { Title, Text } = Typography;

const StatsSection = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    years: 0,
    rating: 0,
    regulars: 0,
  });

  const stats = [
    {
      title: "Автомобилей в день",
      value: counts.clients,
      suffix: "+",
      icon: <CarOutlined className={styles.statIcon} />,
      color: "#1890ff",
    },
    {
      title: "Лет работы",
      value: counts.years,
      suffix: "+",
      icon: <ClockCircleOutlined className={styles.statIcon} />,
      color: "#13c2c2",
    },
    {
      title: "Средняя оценка",
      value: counts.rating,
      precision: 1,
      icon: <StarFilled className={styles.statIcon} />,
      color: "#ffc53d",
    },
    {
      title: "Постоянных клиентов",
      value: counts.regulars,
      suffix: "+",
      icon: <UserOutlined className={styles.statIcon} />,
      color: "#9254de",
    },
  ];

  useEffect(() => {
    const targetValues: any = {
      clients: 45,
      years: 8,
      rating: 4.9,
      regulars: 320,
    };

    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const increment = targetValues.clients / steps;
    const interval = duration / steps;

    const counters: any = {
      clients: 0,
      years: 0,
      rating: 0,
      regulars: 0,
    };

    const timer = setInterval(() => {
      setCounts((prev) => {
        const newCounts: any = { ...prev };
        let allCompleted = true;

        Object.keys(targetValues).forEach((key) => {
          if (counters[key] < targetValues[key]) {
            counters[key] += increment;
            newCounts[key] =
              key === "rating"
                ? Number(counters[key].toFixed(1))
                : Math.floor(counters[key]);
            allCompleted = false;
          }
        });

        if (allCompleted) {
          clearInterval(timer);
          return targetValues;
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.backgroundPattern} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.header}>
          <Text className={styles.subtitle}>Чисто в цифрах</Text>
          <Title level={2} className={styles.title}>
            Наша статистика
          </Title>
          <Text className={styles.description}>
            Более 8 лет обеспечиваем безупречную чистоту ваших автомобилей
          </Text>
        </div>

        <Row gutter={[24, 24]} className={styles.statsRow}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className={styles.statCard} hoverable>
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  {React.cloneElement(stat.icon, {
                    style: { color: stat.color, fontSize: 24 },
                  })}
                </div>

                <div className={styles.statValue}>
                  <Text className={styles.number}>
                    {stat.value}
                    {stat.suffix && (
                      <span className={styles.suffix}>{stat.suffix}</span>
                    )}
                  </Text>
                  {stat.precision && (
                    <span className={styles.decimal}>
                      .{(stat.value % 1).toFixed(1).slice(1)}
                    </span>
                  )}
                </div>

                <Text className={styles.statTitle}>{stat.title}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <div className={styles.achievements}>
          <div className={styles.achievementItem}>
            <CheckCircleOutlined className={styles.achievementIcon} />
            <Text>100% гарантия качества</Text>
          </div>
          <div className={styles.achievementItem}>
            <SmileOutlined className={styles.achievementIcon} />
            <Text>98% довольных клиентов</Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
