
import React from 'react';
import PxMainPage from './PxMainPage';
import { Link, Outlet } from "react-router-dom";
import Footer from '../Components/Footer';
import './ContentPage.css';
const FAQ = () => {
  
  
  return (
    <div >
     <PxMainPage />
     <div className="stock-status">
      <Link to="/"><div className="div33">Головна </div></Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
<Link to="/faq"><div className="div34">FAQ</div></Link>
</div>
<div style={{display:'flex',alignItems:'center',padding:100}} className="frame-wrapper">
            <div className="frame-group">
              <div className="about-us-wrapper">
                <div className="about-us">
                  <div className="brand-message">
                    <h2 className="h24">О нас</h2>
                  </div>
                  <div className="contact-details">
                    <div className="div67">
                      Очень рады, что ты остановил свой выбор именно на нас!
                    </div>
                  </div>
                  <div className="kuputu-vzuttia-zumove-vusoke-1-parent">
                    <img
                      className="kuputu-vzuttia-zumove-vusoke-1-icon"
                      alt=""
                      src="/kuputuvzuttiazumovevusoke-1@2x.png"
                    />
                    <img
                      className="frame-item"
                      loading="eager"
                      alt=""
                      src="/polygon-1.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="hd-brand-container">
                <p className="hd-brand1">
                  <b>История HD_BRAND</b>
                </p>
                <p className="p14">
                  Сеть салонов обуви представлена ​в Украине с 2003 года и на
                  данном этапе является одной из компаний, которая активно
                  развивается привлекая симпатии новых клиентов. Основным
                  направлением деятельности нашей компании является розничная
                  торговля женской и мужской обувью, сумками и аксессуарами.
                </p>
                <p className="blank-line">&nbsp;</p>
                <p className="hd-">
                  Стиль HD - это сочетание линий элегантности, удобства, моды и
                  комфорта. Яркий дизайн и использование современных материалов
                  соответствует актуальным тенденциям мировой моды. Целевая
                  аудитория наших салонов - это люди, которые ведут активный
                  образ жизни, следят за модой и хотят выглядеть стильно. Наши
                  покупатели ценят качественное обслуживание и комфортные
                  условия при покупке.
                </p>
                <p className="blank-line1">&nbsp;</p>
                <p className="p15">
                  <b>Философия марки</b>
                </p>
                <p className="hd-1">
                  HD - это особая черта характера. Человеку, который обладает
                  этим качеством, хватает сил и времени заботиться о близких,
                  быть чутким и внимательным по отношению к другим людям. HD
                  является основополагающим принципом компании в стремлении к
                  совершенствованию окружающего мира и построении гармоничного
                  общества, ключевыми моментами которого являются доверие и
                  чуткое отношение к окружающим.
                </p>
                <p className="hd">
                  Основной слоган компании - HD подчеркивает важность для
                  компании общечеловеческих ценностей: открытость, человечность,
                  заботу о близких. В то же время, данный слоган несет в себе
                  понятие гармоничного развития и непрерывного
                  совершенствования.
                </p>
                <p className="blank-line2">&nbsp;</p>
                <p className="p16">
                  <b className="b">{`Миссия компании `}</b>
                  <span className="span">{`                                                                                                                                                                                                     `}</span>
                </p>
                <p className="p17">
                  Создавая комфортную ОБУВЬ в элегантной форме, мы думаем о ВАС
                  И ХОТИМ сделать вас счастливее!
                </p>
                <p className="blank-line3">&nbsp;</p>
                <p className="p18">
                  <b>Ценности</b>
                </p>
                <p className="p19">{`Мы работаем с людьми и ради людей. Люди – это основа нашего успеха. Потребности наших клиентов, профессиональность и преданность сотрудников, лояльность и целенаправленность команды менеджеров – главная ценность нашей компании. `}</p>
              </div>
              <h2 className="h25">счастье не находят -- его создают!</h2>
            </div>
          </div>
<Footer />
    </div>
  );
};

export default FAQ;
