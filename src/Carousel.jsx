import React, { useState, useEffect } from "react";
import { list } from "./data";
import { FaQuoteRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkNumber = (number) => {
    if (number < 0) {
      return people.length - 1;
    }
    if (number > people.length - 1) {
      return 0;
    }
    return number;
  };

  const prevHandler = () => {
    setCurrentIndex((current) => {
      let newIndex = current - 1;
      return checkNumber(newIndex);
    });
    return;
  };

  const nextHandler = () => {
    setCurrentIndex((current) => {
      let newIndex = current + 1;
      return checkNumber(newIndex);
    });
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextHandler();
    }, 5000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentIndex]);
  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { image, name, title, quote, id } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentIndex)}%)`,
              opacity: personIndex === currentIndex ? "1" : "0",
              visibility: personIndex === currentIndex ? "visible" : "hiden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <h4 className="title">{title}</h4>
            <p className="text">{quote}</p>

            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button className="prev" onClick={prevHandler}>
        <FaAngleLeft />
      </button>
      <button className="next" onClick={nextHandler}>
        <FaAngleRight />
      </button>
    </section>
  );
};

export default Carousel;
