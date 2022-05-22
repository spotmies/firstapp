// import React from 'react'
import React, { useEffect } from "react";
import "./Carouseltimeline.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import sample from "./images/sample.jpg";
import twenty18 from "./images/hny2018.webp";
import twenty19 from "./images/hny2019.webp";
import twenty20 from "./images/hny2020.jpg";
import twenty21 from "./images/hny2021.jpg";
import twenty22 from "./images/hny2022.png";

const Carouseltimeline = () => {
  useEffect(() => {
    const allDots = document.querySelectorAll(".owl-dot");
    // console.log(allDots)
    for (let i = 0; i < 5; i++) {
      if (i === 0 || i === 4)
        allDots[
          i
        ].innerHTML = `<span style="width: 12px;height: 12px;"><p style="top: 20px;margin-left: -10px;font-size: 17px;
    font-weight: 500;position: absolute;">${
      2018 + i
    }</p><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="48" height="48"
viewBox="0 0 48 48"
style=" fill:#000000;top:-43px;margin-left:-25px;position: absolute;">${
          2018 + i
        }<polygon fill="#005a78" points="36,41 30,41 29,45 19,45 18,41 12,41 13,39 35,39"></polygon><path fill="#005a78" d="M23.009,36.974c2.868-3.751,3.971-4.851,3.971-6.95c0-2.868-2.317-4.192-4.192-5.516 c-1.875-1.324-4.964-2.427-3.971-4.302c-0.772-0.552-0.772-0.552-0.772-0.552l-2.317,2.868c0,0-1.747,1.877-1.655,4.082 c0.11,2.647,1.224,3.514,3.53,5.074c3.751,2.537,5.516,3.53,4.523,4.633C23.009,36.974,22.458,36.533,23.009,36.974z"></path><path fill="#005a78" d="M30.654,28.961l4.687-6.041c0,0,1.627-1.736,1.627-4.99s-2.603-5.206-4.013-6.183 c-1.41-0.976-6.617-4.556-6.617-4.556s-1.844-0.976-1.844-2.386c0-1.085,0.298-1.263,0.298-1.263L24.141,3l-4.094,5.493 c0,0-1.627,1.735-1.627,4.339s1.193,4.664,2.495,5.64c1.302,0.976,7.159,4.99,7.159,4.99s1.923,1.428,2.169,3.146 c0.172,1.199,0.086,1.377-0.24,1.919C30.654,28.961,30.654,28.961,30.654,28.961z"></path></svg></span>`;
      else
        allDots[
          i
        ].innerHTML = `<span style="width: 12px;height: 12px;"><p style="top: 20px;font-size: 17px;
    font-weight: 500;margin-left: -10px;position: absolute;">${
      2018 + i
    }</p></span>`;
    }
  }, []);
  // <p style="top: -13px;position: absolute;">${2018+ i}</p>

  return (
    <>
      <section>
        <div class="container-fluid">
          <div className="row title" style={{ marginBottom: "20px" }}>
            <div class="col-sm-12 btn ">
              <h1>Our Journey</h1>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <OwlCarousel
            items={3}
            className="owl-theme"
            loop
            nav={true}
            navText={[
              "<div class='nav-button owl-prev'>‹</div>",
              "<div class='nav-button owl-next'>›</div>",
            ]}
            margin={10}
            // Options={
            //   {
            //     slideBy:3
            //   }
            // }
            slideBy={3}
            // dots={true}
            // dotsEach={true}
            // dotData={true}
          >
            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div><button>2018</button></div>"
              // data-dot="<button>2018</button>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={sample}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty18}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty19}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div><button>2019</button></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty18}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty19}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty20}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div><button>2020</button></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty19}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty20}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty21}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>
            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div><button>2021</button></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty20}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty21}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty22}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>
            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div><button>2022</button></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty21}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={twenty22}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>

            <div
              className="item"
              data-dot="<div class=`DotWrapper`><div></div></div>"
            >
              <img
                className="img"
                style={{
                  width: "65%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src={sample}
                alt=""
              />
              <div>
                <p
                  className="text"
                  style={{
                    padding: "2em 0rem",
                  }}
                >
                  For grabbing the attention of readers, it’s compulsory to
                  write a succinct paragraph by including all the elements. So,
                  to make it easy and simple to understand by the students,
                  let’s start learning more .
                </p>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>
    </>
  );
};

export default Carouseltimeline;
