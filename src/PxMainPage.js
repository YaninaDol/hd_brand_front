import { useEffect } from "react";
import "./PxMainPage.css";

const PxMainPage = () => {


   


   
// document.addEventListener('DOMContentLoaded', function() {
//     let ukrainianBrand = document.getElementById('ukrainianBrand');
//     let currentPosition = 0;
//     function moveElement() {
//         currentPosition += 5; // или другая скорость движения
//         ukrainianBrand.style.left= currentPosition + 'px';
      
//         requestAnimationFrame(moveElement);
//       }
//       moveElement();
//   });

     return (
      <div className="px-main-page">
             <section className="header-frame">
        <div className="ticker">
          <div className="ukrainian-brand" id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand1"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand2"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand3"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand4"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand5" id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand6"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand7"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand8"  id="ukrainianBrand">Ukrainian brand</div>
          <div className="ukrainian-brand9"  id="ukrainianBrand">Ukrainian brand</div>
        </div>
        <header className="header">
        <div className="header-container">
          <div className="logo-menu-navigation">
            <img
              className="logo-icon"
              loading="eager"
              alt=""
              src={require('./assets/logo@2x.png')}
            />
            <div className="menu-navigation">
              <div className="menu-navigation-button-contain">
                <div className="button-nav">взуття</div>
              </div>
              <div className="menu-navigation-button-contain1">
                <div className="button-nav1">одяг</div>
              </div>
              <div className="menu-navigation-button-contain2">
                <div className="button-nav2">аксесуари</div>
              </div>
              <div className="menu-navigation-button-contain3">
                <div className="button-nav3">догляд за взуттям</div>
              </div>
              <div className="menu-navigation-button-contain4">
                <div className="button-nav4">знижки</div>
              </div>
              <div className="menu-navigation-button-contain5">
                <div className="button-nav5">FAQ</div>
              </div>
            </div>
          </div>
          <div className="search-field-icons">
            <div  className="search-field">
              <img
                className="icon-search"
                loading="eager"
                alt=""
                src={require('./assets/search.png')}
              />
              <div className="div">Що будемо шукати?</div>
            </div>
            <div className="icons">
              <img
                className="language-icon"
                loading="eager"
                alt=""
                src={require('./assets/language.png')}
              />
              <img
                className="user-icon"
                loading="eager"
                alt=""
                src={require('./assets/user.png')} 
              />
              <img
                className="favourite-icon"
                loading="eager"
                alt=""
                src={require('./assets/favourite.png')}
              />
              <div className="shopping-bag-1">
                <img
                  className="pagination-element-frame"
                  loading="eager"
                  alt=""
                  src={require('./assets/vector.png')}
                />
                <div className="heading-frame">
                  <div className="item-card-frame">1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </header>
        </section>
      </div>
  );
};

export default PxMainPage;