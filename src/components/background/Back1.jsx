import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Данные для изображений и текста
const imagesData = [
  {
    image: 'https://i.ibb.co/qLRxs92w/airbus.jpg',
    textH1: 'Авиационная техника',
    textH2: 'Кислородные системы и агрегаты для авиационной техники',
  },
  {
    image: 'https://i.ibb.co/DHYy34bt/vodolaz.jpg',
    textH1: 'Водолазная техника',
    textH2: 'Индивидуальные дыхательные аппараты для проведения подводно-технических работ, акваланги, аппараты, применяемые при борьбе за живучесть судов',
  },
  {
    image: 'https://i.ibb.co/6R87fwbh/pozar.jpg',
    textH1: 'Системы пожарной защиты',
    textH2: 'Воздушные и кислородные дыхательные аппараты для пожарных и спасателей; самоспасатели, контрольно-проверочная аппаратура',
  },
  {
    image: 'https://i.ibb.co/tp0jQTZ9/metal.jpg',
    textH1: 'Техника общепромышленного назначения',
    textH2: 'Вентили и редукторы газовые различного назначения',
  },
];

const Back1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoChange, setAutoChange] = useState(true);

  useEffect(() => {
    if (autoChange) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
      }, 5000); // Автосмена каждые 5 секунд
      return () => clearInterval(interval);
    }
  }, [autoChange]);

  const handleNext = (index) => {
    setCurrentIndex(index);
    setAutoChange(false); // Остановить автосмену при ручном выборе
  };

  return (
    <Container disableGutters sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <motion.div
        key={currentIndex} // Ключ для анимации смены изображений
        style={{
          backgroundImage: `url(${imagesData[currentIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '1920px',
          position: 'absolute',
          zIndex: -1,
          overflow: 'hidden'
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
      />
      <Box sx={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {imagesData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              color: 'white',
              textAlign: 'left',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон для карточек
              borderRadius: '10px',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)', // Увеличение карточки при наведении
              },
              border: currentIndex === index ? '2px solid #2F95F7' : 'none', // Индикатор текущей карточки
            }}
            onClick={() => handleNext(index)} // Смена изображения при клике на текст
          >
            <Typography variant="h6" component="div">
              {item.textH1}
            </Typography>
            <Typography variant="body2">
              {item.textH2}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '20px',
          width: 'calc(100% - 40px)',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${(currentIndex + 1) * (100 / imagesData.length)}%`,
            backgroundColor: '#2F95F7',
            transition: 'width 5s linear', // Анимация изменения ширины полоски
          }}
        />
      </Box>
    </Container>
  );
};

export default Back1;
