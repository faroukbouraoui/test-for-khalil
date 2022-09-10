import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Empty, Modal, Image } from 'antd';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import pageItem1 from '../assets/img/projection-activity1.png'
import pageItem2 from '../assets/img/projection-activity1.png'
import pageItem3 from '../assets/img/projection-activity1.png'
import pageItem4 from '../assets/img/projection-activity1.png'
import pageItem5 from '../assets/img/projection-activity1.png'
import pageItem6 from '../assets/img/projection-activity1.png'
import player from '../assets/img/video-player.png'
import Video from '../assets/video/SurLaTransversale.mp4'
import { apiURL } from "../Config/Config";
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"


const Rapports = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
        getAllRapportAsc(pageInit, filter)
        if(rapport !== newRapport){
            setNewRapport(rapport)
            
        }
    }, []);
    
    const [visible, setVisible] = useState(false);
    const [rapport, setRapport] = useState();
    const [rapportImage, setRapportImage] = useState();
    const [uniqueRapport, setUniqueRapport] = useState();
    const sliderRef = useRef()
    const sliderRefModal = useRef()
    const [pageInit, setPageInit] = useState(0)
    const [newRapport, setNewRapport] = useState();
    const [filter, setFilter] = useState('ASC')

    const nextModal = () => {
        sliderRefModal.current.slickNext();
    };

    // Trigger previous method to show the previous slides
    const previousModal = () => {
        sliderRefModal.current.slickPrev();
    };
    
    const next = () => {
        getAllRapportAsc(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1, filter)
        getAllRapportAsc(pageInit-1) 
    };

    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: 0,
      speed: 500,
      slidesToShow: 3,
      rows: rapport && rapport.length<6?1:2,
      slidesPerRow: 1,

      responsive: [
          {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            rows: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            rows: 1
          }
        }
      ],
      dots: false,

    };
    const getAllRapportAsc =async(page, filter)=>{
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type',filter)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };
        const data = await fetch(apiURL+'/rapport/getall', requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setRapport(dataJson);
            console.log("dataJson",dataJson);
        }
    }
    const getAllRapportDesc =async()=>{
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+'/rapport/getallDESC', requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setRapport(dataJson);
        }
    }
    const getImage =(base64)=>{
        var image = new Image();
        // console.log("douta",image.src=base64);
        return image.src = base64;   
    }
    const showModal =async(el)=>{
        console.log("el",el);
        const requestOptions = {
            method: 'GET',
          };
        setVisible(true)
        const data = await fetch(apiURL+'/photorapport/getall/'+el.id,requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setRapportImage(dataJson)
            setUniqueRapport(el)
        }
    }
    
    const NextImageArrow = ({ onClick }) => {
        return (
        <div className="image-arrow image-next" onClick={onClick}>
            <img className="image-arrow-size" src={rightarrow}/>
        </div>
        );
    };
    const PrevImageArrow = ({ onClick }) => {
            return (
            <div className="image-arrow image-prev" onClick={onClick}>
                <img className="image-arrow-size" src={leftarrow}/>
            </div>
            );
    };
    const settingsImage = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: 0,
        slidesToShow: 1,
        speed: 500,
        appendDots: dots => (
            <div>
              <ul style={{ margin: "0px", padding: "0px" }}> 
              <li>
              {/* <button>"20"</button> */}
               {/* onClick={prevClick}  onClick={nextClick}*/}
                <div className="dots-arrow dots-prev" onClick={previousModal} >
                    <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                </div>
              </li>
                {dots} 
              <li>
                <div className="dots-arrow dots-next" onClick={nextModal} >
                    <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
                </div>
              </li>
              </ul>
            </div>
          ),      
        responsive: [
            {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,            
            }
            }
        ],
        dots: true,
        // nextArrow: <NextImageArrow />,
        // prevArrow: <PrevImageArrow />
        };
        useEffect(() => {
            console.log(rapport);
          }, []);
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
            <Slider {...settingsImage} ref={slider => (sliderRefModal.current = slider)} className="centerImageSlider">
                {rapportImage && rapportImage.map((el)=>(
                <div>
                <center>
                    <Image src={el.data} className="img-preview" height={'100%'} />
                </center>
                </div>
                ))}
            </Slider> 
            <div className={props.auth.lang+"_media-modal-flex"}> 
            {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueRapport && uniqueRapport.titre}</h2>:
                <h2 className={props.auth.lang+"_modal-title"}>{uniqueRapport && uniqueRapport.titrear}</h2>}
             </div>
                
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueRapport && uniqueRapport.description}</p>:
                <p className={props.auth.lang+"_modal-content"}>{uniqueRapport && uniqueRapport.descriptionar}</p>}
            </div>
            </Modal>
            {/* Rapports Image-Text */}
            {/* <section className="slider-page-section">
                <h1 className="page-title">Rapports/ <br /> Publications</h1>
                <div className="page-slider-shadow"></div>
            </section> */}
            <section className={props.auth.lang+"_slider-rapport-section"}>
                <h1 className={props.auth.lang+"_ressources-title"}> {getLanguage(props).Rapports}<br />{getLanguage(props).Publications} </h1>
                <div className="ressources-slider-shadow"></div>
            </section>
            <section className="projection-text-section">
                <p className={props.auth.lang+"_projection-text"}>{getLanguage(props).RapportsText}</p>
            </section>
            <section className={props.auth.lang+"_page-content-header"}>
                    <div className={props.auth.lang+"_page-content-header-left"}>
                        <span className="page-title-decoration"></span>
                        <h2 className={props.auth.lang+"_page-activity-title"}>{getLanguage(props).Galerie}</h2>
                    </div>
                    <div className="page-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllRapportAsc(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllRapportAsc(0,"DESC")} /></div>
                    </div>
            </section>            
            {rapport && rapport.length !=0 ?<section className="page-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                     {rapport.map((el)=>(
                        <div className="page-activity-card" onClick={()=>showModal(el)} >
                        <div className="img-container">
                            {/* <img src={el.photoRapports.data} height="100%" /> */}
                            <img src={apiURL+"/photorapport/getall/"+el.photoRapports['id']+"/thumb.jpg"} height={'100%'}/>  
                            <div className="page-activity-card-banner" style={{backgroundColor: "#FECC17"}}>
                                <span className={props.auth.lang+"_page-activity-date"}>
                                {/* <Moment format="DD/MM/YYYY"> */}
                                {getCurrentLocalDate(props,el.date)}
                                {/* </Moment> */}
                                </span>
                                {props.auth.lang =='fr'? <h3 className={props.auth.lang+"_page-activity-card-title"}>{el.titre.length <= 15? el.titre: el.titre.substring(0,15)+"..."}</h3>:
                                <h3 className={props.auth.lang+"_page-activity-card-title"}>{el.titrear.length <= 15? el.titrear: el.titrear.substring(0,15)+"..."}</h3>      }                         
                            </div>
                            </div>
                        </div>
                    ))}
                    
                </Slider>
                
            </section>:<Empty />}
            <div className='slick-dots'>
                    <ul style={{ margin: "0px", padding: "0px" }}> 
                        <li>
                            <div className="dots-arrow dots-prev" onClick={previous} >
                                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
                            </div>
                        </li>
                        <li className="point-pagination_react_slick"></li>
                        <li>
                            <div className="dots-arrow dots-next" onClick={next} >
                                <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
                            </div>
                        </li>
                    </ul>
                </div>

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
      
export default connect(mapStateToProps, mapDispatchToProps)(Rapports);