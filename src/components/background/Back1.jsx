import React, { useState, useEffect } from 'react';
import './Back1.css';
import airbusImage from '../../assets/airbus.jpg';
import vodolazImage from '../../assets/vodolaz.jpg';
import pozarImage from '../../assets/pozar.jpg'
import metalImage from '../../assets/metal.jpg'

// Массив данных с изображениями и текстами
const data = [
  {
    image: airbusImage,
    textH1: 'Авиационная техника',
    textH2: 'Кислородные системы и агрегаты для авиационной техники'
  },
  {
    image: vodolazImage,
    textH1: 'Водолазная техника',
    textH2: 'Индивидуальные дыхательные аппараты для проведения подводно-технических работ, акваланги, аппараты, применяемые при борьбе за живучесть судов'
  },
  {
    image: pozarImage,
    textH1: 'Системы пожарной защиты',
    textH2: 'Воздушные и кислородные дыхательные аппараты для пожарных и спасателей; самоспасатели, контрольно-проверочная аппаратура'
  },
  {
    image: metalImage,
    textH1: 'Техника общепромышленного назначения',
    textH2: 'Вентили и редукторы газовые различного назначения',
  },
];

const Back1 = () => {
  const [selectedTile, setSelectedTile] = useState(0);

  useEffect(() => {
    data.forEach(item => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Функция для выбора плитки
  const selectTile = (index) => {
    setSelectedTile(index);
  };

  // Получаем данные для выбранной плитки
  const { image, textH1, textH2 } = data[selectedTile] || {};

  return (
    <div className='tiles-container'>
      <div className='tile-text-container'>
      {data.map((item, index) => (
        <div
          key={index}
          className={`tile ${selectedTile === index ? 'selected' : ''}`}
          onClick={() => selectTile(index)}
        >
          <span className='text-h1'>{item.textH1}</span>
          <span className='text-h2'>{item.textH2}</span>
        </div>
      ))}
      </div>
      {selectedTile !== null && (
        <div className='back1-image' style={{ backgroundImage: `url(${image})` }}>
        </div>
      )}
    </div>
  );
};

export default Back1;