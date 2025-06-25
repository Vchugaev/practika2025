"use client"
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Row, Col, Button } from 'antd';
import { 
  StarFilled, 
  LeftOutlined, 
  RightOutlined,
  UserOutlined
} from '@ant-design/icons';
import styles from './ReviewsSection.module.css';

const { Title, Text, Paragraph } = Typography;

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Константин Г.",
      rating: 5,
      text: "Лучшая автомойка в городе! Машина после мойки выглядит как новая. Очень понравился мойщик Шамиль!",
      date: "15 июня 2023",
      avatar: null,
      car: "BMW X5"
    },
    {
      id: 2,
      name: "Екатерина В.",
      rating: 4,
      text: "Очень качественная мойка, особенно понравилась химчистка салона. Единственное - немного задержали по времени, но результат того стоил.",
      date: "2 июня 2023",
      avatar: null,
      car: "Mercedes C-Class"
    },
    {
      id: 3,
      name: "Дмитрий С.",
      rating: 5,
      text: "Мою машину здесь уже 3 года и ни разу не было нареканий. Всегда чисто, быстро и недорого. Особенно нравится защитное покрытие - держится несколько месяцев.",
      date: "28 мая 2023",
      avatar: null,
      car: "Audi Q7"
    },
    {
      id: 4,
      name: "Ольга М.",
      rating: 5,
      text: "Впервые воспользовалась услугами и приятно удивлена! Автомойка 'Чисто' действительно оправдывает своё название. Буду постоянным клиентом!",
      date: "20 мая 2023",
      avatar: null,
      car: "Lexus RX"
    }
  ];

  const nextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>Отзывы наших клиентов</Title>
        <Text className={styles.subtitle}>Что говорят люди о нашем сервисе</Text>
      </div>

      <div className={styles.reviewsContainer}>
        <div className={styles.reviewsSlider}>
          <div 
            className={`${styles.reviewsTrack} ${isAnimating ? styles.animating : ''}`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className={styles.reviewWrapper}
                data-active={index === activeIndex}
              >
                <Card 
                  className={styles.reviewCard}
                  hoverable
                >
                  <div className={styles.quoteIcon}>
                    <UserOutlined />
                  </div>

                  <div className={styles.reviewHeader}>
                    <Avatar 
                      size={64} 
                      icon={<UserOutlined />} 
                      className={styles.avatar}
                    />
                    <div className={styles.reviewerInfo}>
                      <Text strong className={styles.reviewerName}>{review.name}</Text>
                      <Text type="secondary" className={styles.reviewerCar}>{review.car}</Text>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <StarFilled 
                            key={i} 
                            className={i < review.rating ? styles.starFilled : styles.starEmpty}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Paragraph className={styles.reviewText}>
                    {review.text}
                  </Paragraph>

                  <Text type="secondary" className={styles.reviewDate}>
                    {review.date}
                  </Text>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.dots}>
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;