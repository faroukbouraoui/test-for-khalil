import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Modal } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import singleProgram from '../assets/img/single-program-slider.png'
import singleProgram1 from "../assets/img/single-program1.png";
import singleProgram2 from "../assets/img/single-program2.png";
import singleProgram3 from "../assets/img/single-program3.png";
import singleProgram4 from "../assets/img/single-program4.png";
import player from '../assets/img/video-player.png'
import Video from '../assets/video/SurLaTransversale.mp4'

const SingleProgram = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);

    const [visible, setVisible] = useState(false);

    const settings = {
      className: "center",
      centerMode: false,
      infinite: true,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 2,
      rows: 2,
      slidesPerRow: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          }
        }
      ],
      dots: true,
    };

    return(
        <>
        <Modal                
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                
            >
            <div className="modal-container">
                <video className="video-in-modal" width="90%" height="auto" controls >
                    <source src={Video} type="video/mp4"/>
                </video>
                <h2 className="modal-title">Titre  n’importe quoi X </h2>
                <p className="modal-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galle</p>
            </div>
        </Modal>
            <section>
                <img src={singleProgram} className="single-program-img"/>
            </section>
            <section className="single-program-content-padding">
                <h2 className="single-program-title">
                    Titre programme
                </h2>
                <p className="single-program-content">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    nter took a galley of type and scrambled it to make a type specimen book. It has
                </p>
            </section>
            
            <div class="single-program-content-header-left">
                <span class="single-program-title-decoration"></span>
                <h2 class="single-program-activity-title">Galerie</h2>
            </div>
            <section className="single-program-slider-section">
                <Slider {...settings}>
                    <div className="single-program-card">
                        <img src={singleProgram1} className="single-program-full-height" />
                    </div>
                    <div className="single-program-card">
                        <img src={singleProgram2} className="single-program-full-height" />
                    </div>
                    <div className="single-program-card">
                        <img src={singleProgram3} className="single-program-full-height" />
                    </div>
                    <div className="single-program-card" onClick={() => setVisible(true)}>
                        <img src={player} className="single-program-video-player" />
                        <img src={singleProgram4} className="single-program-full-height" />
                    </div>
                    <div className="single-program-card">
                        <img src={singleProgram1} className="single-program-full-height" />
                    </div>
                    <div className="single-program-card" onClick={() => setVisible(true)}>
                        <img src={player} className="single-program-video-player" />
                        <img src={singleProgram4} className="single-program-full-height" />
                    </div>
                    
                    <div className="single-program-card">
                        <img src={singleProgram3} className="single-program-full-height" />
                    </div>                    
                </Slider>
            </section>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
        dispatch(action);
        },
    };
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        };
    };
      
export default connect(mapStateToProps, mapDispatchToProps)(SingleProgram);