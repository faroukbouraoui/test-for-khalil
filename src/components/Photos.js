import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Empty, Modal, Image, Spin } from 'antd';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
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



const Photos = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
        getAllPhotoDesc(pageInit, filter)
        if(photo !== newPhoto){
            setNewPhoto(photo)
            
        }
    }, []);

    
    const [visible, setVisible] = useState(false);
    const [photo, setPhoto] = useState();
    const [uniquePhoto, setUniquePhoto] = useState();
    const [source, setSource] = useState();
    const [Images, setImages] = useState()
    const sliderRef = useRef()
    const [pageInit, setPageInit] = useState(0)
    const [newPhoto, setNewPhoto] = useState();
    const [filter, setFilter] = useState('ASC')
    
    const next = () => {
        // sliderRef.current.slickNext();
        getAllPhotoDesc(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1)
        // sliderRef.current.slickPrev();
        getAllPhotoDesc(pageInit-1, filter)
        
    };

    const settings = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 4,
      rows: photo && photo.length<12?1:3,
      slidesPerRow: 1,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
          {/* <button>"20"</button> */}
           {/* onClick={prevClick}  onClick={nextClick}*/}
            <div className="dots-arrow dots-prev" onClick={previous} >
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
          </li>
            {dots} 
          <li>
            <div className="dots-arrow dots-next" onClick={next} >
                <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
            </div>
          </li>
          </ul>
        </div>
      ),
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
          }
        }
      ],
      dots: false,
    //   appendDots: dots => (
    //     <div>
    //         <ul> 
    //             <img className="page-arrow-size" src={leftarrow} onClick={pagePrevArrow()}/>
    //             {dots} 
    //             <img className="page-arrow-size" src={rightarrow} onClick={pageNextArrow()}/>
    //         </ul>
    //     </div>
    //   ),
    //   nextArrow: <pageNextArrow />,
    //   prevArrow: <pagePrevArrow />
    };
    // const getAllPhoto =async()=>{
    //     const requestOptions = {
    //         method: 'GET',
    //       };
    //     const data = await fetch(apiURL+"/photoarchive/getall",requestOptions);
    //     const dataJson = await data.json();
    //     if(data.status == 200){
    //         setPhoto(dataJson);
    //     }
    // }
    const getAllPhotoAsc =async()=>{
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+"/photoarchive/getallASC",requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            setPhoto(dataJson);
        }
    }
    // const getAllPhotoDesc =async()=>{
    //     const requestOptions = {
    //         method: 'GET',
    //       };
    //     const data = await fetch(apiURL+"/photoarchive/getallDESC",requestOptions);
    //     const dataJson = await data.json();
    //     if(data.status == 200){
    //         setPhoto(dataJson);
    //     }
    // }
    const getAllPhotoDesc =async(page, filter)=>{
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',12)
        formdata.append('type',filter)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };
        const data = await fetch(apiURL+"/photoarchive/getall",requestOptions);
        const dataJson = await data.json();
        setPhoto(dataJson)
    }
    const showModal =(el)=>{
        setVisible(true)
        setUniquePhoto(el)
        setSource(el.source)
        getImage(el.id)
    }
    const getImage = async(id)=>{
        try {
            const requestOptions = {
                method: 'GET',
              };
            const data = await fetch(apiURL+"/photoarchive/getall/"+id+"/full.jpg",requestOptions);
            if(data.status == 200){
                const dataJson = await data.json();
                setImages(dataJson)
            } 
          } catch (error) {
            console.log(error);
          }
        
    }
console.log('image',Images);
 
    
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
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <center>
            <Image src={Images && Images != undefined ? Images : null} height={'100%'} className="img-preview" />
            </center>
            </div>
                <div className={props.auth.lang+"_media-modal-flex"}>  
                {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniquePhoto && uniquePhoto.name}</h2>:
                <h2 className={props.auth.lang+"_modal-title"}>{uniquePhoto && uniquePhoto.namear}</h2>}
                {/* <a className="media-source-button" disabled={imageSource==undefined} target="_blank" rel="noopener noreferrer" href="#">Source <ExportOutlined style={{paddingLeft:10}}/></a> */}
                </div>
                {props.auth.lang =='fr'? <p className={props.auth.lang+"_modal-content"}>{uniquePhoto && uniquePhoto.description}</p>:
                <p className={props.auth.lang+"_modal-content"}>{uniquePhoto && uniquePhoto.descriptionar}</p>}
                <a className="media-source-button" disabled={source==undefined} target="_blank" rel="noopener noreferrer" href={source}>Source <ExportOutlined style={{paddingLeft:10}}/></a>

            </div>
            </Modal>
            {/* photos Image-Text */}
            {/* <section className="slider-page-section">
                <h1 className="page-title">Photos</h1>
                <div className="page-slider-shadow"></div>
            </section> */}
             <section className={props.auth.lang+"_slider-photo-section"}>
                <h1 className={props.auth.lang+"_ressources-title"}>{getLanguage(props).Photos}</h1>
                <div className="ressources-slider-shadow"></div>
            </section>
            <section className="projection-text-section">
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_projection-text"}>{getLanguage(props).PhotosText}</p>:
                <div className={props.auth.lang+"_arbicPhotosText"}>
                    <span className={props.auth.lang+"_projection-text"}>{getLanguage(props).PhotosText1}</span><br />
                    <span className={props.auth.lang+"_projection-text"}>{getLanguage(props).PhotosText2}</span><br />
                </div>
                }
            </section>
            <section className={props.auth.lang+"_page-content-header"}>
                    <div className={props.auth.lang+"_page-content-header-left"}>
                        <span className="page-title-decoration"></span>
                        <h2 className={props.auth.lang+"_page-activity-title"}>{getLanguage(props).Galerie}</h2>
                    </div>
                    <div className="page-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllPhotoDesc(0,'DESC')}/><UpOutlined className="pagination-icon" onClick={()=>getAllPhotoDesc(0,'ASC')}/></div>
                    </div>
            </section>            
            <section className="page-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                    {photo && photo.length !==0 ? photo.map((el)=>(
                    <div className="page-activity-card" onClick={()=>showModal(el)} >
                    <div className="img-container">
                        {/* <img src={el.data} height="100%" /> */}
                        <img src={apiURL+"/photoarchive/getall/"+el['id']+"/thumb.jpg"} height={'100%'}/>                        

                        <div className="page-activity-card-banner" style={{backgroundColor: "#FECC17"}}>
                            <span className={props.auth.lang+"_page-activity-date"}>
                            {/* <Moment format="DD/MM/YYYY"> */}
                            {getCurrentLocalDate(props,el.date)}
                            {/* </Moment> */}
                            </span>
                            <h3 className={props.auth.lang+"_page-activity-card-title"}>{el.name.length <= 15? el.name: el.name.substring(0,15)+"..."}</h3>                            
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Photos);