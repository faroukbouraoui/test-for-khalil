import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Empty, Modal } from 'antd';

import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import player from '../assets/img/video-player.png'
import { apiURL } from "../Config/Config";
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import YouTube from 'react-youtube';
import getLanguage from "./utilFunction/language"
import getCurrentLocalDate from "./utilFunction/currentLocalDate"
const Videos = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
        getAllVideoAsc(pageInit, filter)
        if(videos !== newVideo){
            setNewVideo(videos)
            
        }
    }, []);
    
    const [visible, setVisible] = useState(false);
    const [videos, setVideos] = useState();
    const [uniqueVideo, setUniqueVideo] = useState()
    const [uniqueElement, setUniqueElement] = useState('')
    const [idVideo, setIdVideo] = useState()
    const sliderRef = useRef()
    const [pageInit, setPageInit] = useState(0)
    const [newVideo, setNewVideo] = useState();
    const [filter, setFilter] = useState('ASC')
    
    const next = () => {
        getAllVideoAsc(pageInit+1, filter)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit-1)
        getAllVideoAsc(pageInit-1, filter)
        
    };

    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        slidesToShow: 1,
        speed: 500,
        slidesToShow: 3,
        rows: videos && videos.length<6?1:2,
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
 
    const getAllVideoAsc =async(page, filter)=>{
        console.log("here");
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type', filter)
        const requestOptions ={
            method: 'POST',
            body: formdata
        };
        const data = await fetch(apiURL+'/videoarchive/getall',requestOptions);
        if(data.status == 200){
            const dataJson = await data.json();
            setVideos(dataJson);
            console.log("dataJson",dataJson);
            
        }
    }
    const getAllVideoDesc =async()=>{
        const requestOptions ={
            method: 'GET',
        };
        const data = await fetch(apiURL+'/videoarchive/getallDESC',requestOptions);
        if(data.status == 200){
            const dataJson = await data.json();
            setVideos(dataJson);
        }
    }

    const showModal =(el)=>{
        console.log("ellllllllll",el);
        setUniqueVideo(el)
        setIdVideo(el.path.substr(32,11))
        setVisible(true)    
    }

    const closeModal =()=>{
        setVisible(false)
        setUniqueVideo('')
    }
   
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const onReady=(event)=> {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
     
    return(

        <>
        <Modal                
                centered
                visible={visible}
                onOk={() => closeModal() }
                onCancel={() => closeModal()}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                destroyOnClose={true}
                
            >
                
            <div className="modal-container">
            <div class="video-container">
          
           
            <YouTube videoId={idVideo} opts={opts} onReady={onReady} />
            </div>  
                     {/* <ReactPlayer playsinline={true} width={'100%'} height={'500px'} url={uniqueVideo && uniqueVideo.path} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen /> */}
                     <div className={props.auth.lang+"_media-modal-flex"}>

                     {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titre}</h2>: 
                    <h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titrear}</h2>}
                     </div>
                
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.description}</p>: 
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.descriptionar}</p>}
            </div>
            </Modal>
            {/* Videos Image-Text */}
            {/* <section className="slider-page-section">
                <h1 className="page-title">Videos</h1>
                <div className="page-slider-shadow"></div>
            </section> */}
            <section className={props.auth.lang+"_slider-video-section-page"}>
                <h1 className={props.auth.lang+"_ressources-title"}>{getLanguage(props).Videos}</h1>
                <div className="ressources-slider-shadow"></div>
            </section>
            <section className="projection-text-section">
                <p className={props.auth.lang+"_projection-text"}>{getLanguage(props).VideosText}</p>
            </section>
            <section className={props.auth.lang+"_page-content-header"}>
                    <div className={props.auth.lang+"_page-content-header-left"}>
                        <span className="page-title-decoration"></span>
                        <h2 className={props.auth.lang+"_page-activity-title"}>{getLanguage(props).Videos}</h2>
                    </div>
                    <div className="page-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).TrierParDate}</span><DownOutlined className="pagination-icon" onClick={()=>getAllVideoAsc(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllVideoAsc(0,'DESC')} /></div>
                    </div>
            </section>            
            <section className="page-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                    {videos && videos.length !==0 ? videos.map((el)=>(
                        <div className="page-activity-card" onClick={() => showModal(el)}>                                       
                        <div className="img-container">
                        <img src={player} className="video-player"/> 
                            {/* <img src={el.photo} height="100%" />*/}
                            <img src={apiURL+"/videoarchive/get/"+el['id']+"/thumb.jpg"} height={'100%'}/>                        
                            <div className="page-activity-card-banner" style={{backgroundColor: "#FECC17"}}>
                                <span className={props.auth.lang+"_page-activity-date"}>
                                {/* <Moment format="DD/MM/YYYY"> */}
                                {getCurrentLocalDate(props,el.date)}
                                {/* </Moment> */}
                                </span>
                                {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_page-activity-card-title"}>{el.titre.length <= 20? el.titre: el.titre.substring(0,20)+"..."}</h3>:
                                <h3 className={props.auth.lang+"_page-activity-card-title"}>{el.titrear.length <= 20? el.titrear: el.titrear.substring(0,20)+"..."}</h3>}                            
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Videos);