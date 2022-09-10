import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Empty, Modal, Image } from 'antd';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { apiURL } from "../Config/Config";
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language"


const Brochures = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
        getAllBrochureAsc(pageInit, filter)
        if(brochure !== newBrochure){
            setNewBrochure(brochure)
            
        }
        // getAllBrochure()
    }, []);
    const sliderRef = useRef()
    const sliderRefModal = useRef()
    const [visible, setVisible] = useState(false);
    const [brochure, setBrochure] = useState(false);
    const [uniqueBrochure, setUniqueBrochure] = useState()
    const [pageInit, setPageInit] = useState(0)
    const [newBrochure, setNewBrochure] = useState();
    const [ uniqueBrochureData, setUniqueBrochureData] = useState()
    const [filter, setFilter] = useState('ASC')
    const next = () => {
        getAllBrochureAsc(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1)
        getAllBrochureAsc(pageInit-1, filter)
        
    };

    const nextModal = () => {
        sliderRefModal.current.slickNext();
    };

    // Trigger previous method to show the previous slides
    const previousModal = () => {
        sliderRefModal.current.slickPrev();
    };

    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        slidesToShow: 1,
        speed: 500,
        slidesToShow: 3,
        rows: brochure && brochure.length<6?1:2,
        slidesPerRow: 1,

        responsive: [
            {
        breakpoint: 991,
        settings: {
            slidesToShow: 2,   
            rows: 1,         
        }
        },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              rows: 1,
            }
          }
        ],
        dots: false,
      };

    const getAllBrochureAsc =async(page, filter)=>{
        let formdata =new FormData()
                            formdata.append('page',page)
                            formdata.append('nbpage',6)
                            formdata.append('typeoftrie',filter)
                            
        const requestOptions = {
                method: 'POST',
                body: formdata
        };
        const data = await fetch(apiURL+"/brochure/getall",requestOptions);
         const dataJson = await data.json();
         if(data.status == 200){
             setBrochure(dataJson)
         }
    }
    const getAllBrochureDesc =async()=>{
        const requestOptions = {
                method: 'GET',
        };
         const data = await fetch(apiURL+'/brochure/getallDESC', requestOptions);
         const dataJson = await data.json();
         if(data.status == 200){
             
             setBrochure(dataJson)
         }
    }
    const showModal =async(el)=>{
        const requestOptions = {
            method: 'GET',
          };
        setVisible(true)
        const data = await fetch(apiURL+'/photobrochure/getall/'+el.id,requestOptions);
        const dataJson = await data.json();
        console.log("hereee",dataJson);
        if(data.status == 200){
            setUniqueBrochure(dataJson)
            setUniqueBrochureData(el)
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
            <Slider {...settingsImage} ref={slider => (sliderRefModal.current = slider)} >
            {uniqueBrochure && uniqueBrochure.map((el)=>(               
                <div>
                <center>                                  
                    <Image src={el.data} className="img-preview"/>
                </center>
                </div>
            ))}             
            </Slider>
            <div className={props.auth.lang+"_media-modal-flex"}>
            {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueBrochureData && uniqueBrochureData.titre}</h2>:
            <h2 className={props.auth.lang+"_modal-title"}>{uniqueBrochureData && uniqueBrochureData.titrear}</h2>}
            </div>  
            
            {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueBrochureData && uniqueBrochureData.description}</p>:
            <p className={props.auth.lang+"_modal-content"}>{uniqueBrochureData && uniqueBrochureData.descriptionar}</p>}
            </div>
            </Modal>
            {/* Brochures Image-Text */}
            <section className="slider-brochure-section">
                <h1 className={props.auth.lang+"_brochure-title"}> {getLanguage(props).brochures}<br />{getLanguage(props).Communiqués} </h1>
                <div className="page-slider-shadow"></div>
            </section>
            <section className="projection-text-section">
                <p className={props.auth.lang+"_projection-text"}>{getLanguage(props).brochuresText}
</p>
            </section>
            <section className={props.auth.lang+"_page-content-header"}>
                    <div className={props.auth.lang+"_page-content-header-left"}>
                        <span className="page-title-decoration"></span>
                        <h2 className={props.auth.lang+"_page-activity-title"}>{getLanguage(props).Galerie}</h2>
                    </div>
                    <div className="page-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllBrochureAsc(0,"ASC")}/><UpOutlined className="pagination-icon" onClick={()=>getAllBrochureAsc(0,'DESC')} /></div>
                    </div>
            </section>            
            <section className="page-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                    {brochure && brochure.length !==0 ? brochure.map((el)=>(
                        <div className="page-activity-card" onClick={() => showModal(el)}>                                       
                    <div className="img-container">
                    
                        {/* <img src={el.photoBrochures.data} height="100%" />  */}
                        <img src={apiURL+"/photobrochure/getall/"+el.photoBrochures.id+"/thumb.jpg"} height={'100%'}/>                         
                        <div className="page-activity-card-banner" style={{backgroundColor: "#FECC17"}}>
                            <span className={props.auth.lang+"_page-activity-date"}>
                            {/* <Moment format="DD/MM/YYYY"> */}
                            {el.date}
                            {/* </Moment> */}
                            </span>
                            <h3 className={props.auth.lang+"_page-activity-card-title"}>{el.titre.length <= 25 ? el.titre: el.titre.substring(0,25)+"..."}</h3>                            
                        </div>
                        </div>
                    </div>
                    )):<Empty />}
                    
                </Slider>
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Brochures);