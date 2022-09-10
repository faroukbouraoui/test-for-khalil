import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Row, Empty, Image, Modal } from 'antd';
import YouTube from 'react-youtube';
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { apiURL } from "../Config/Config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import player from '../assets/img/video-player.png'
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import getLanguage from "./utilFunction/language";
import getCurrentLocalDate from "./utilFunction/currentLocalDate"


const Plaidoyer = (props)=>{

    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleVideo, setVisibleVideo] = useState(false);
    const [plaidoyer, setPlaidoyer] = useState();
    const [imagePlaidoyer, setImagePlaidoyer] = useState("");
    const [videoPlaidoyer, setVideoPlaidoyer] = useState();
    const [uniqueVideo, setUniqueVideo] = useState()
    const [titlePlaidoyer, setTitlePlaidoyer] = useState("");
    const [descriptionPlaidoyer, setDescriptionPlaidoyer] = useState("");
    const [pageInit, setPageInit] = useState(0)
    const [newPlaidoyer, setNewPlaidoyer] = useState();
    const [pageInitVideo, setPageInitVideo] = useState(0)
    const [newPlaidoyerVideo, setNewPlaidoyerVideo] = useState();
    const [imagePlaydoyercontext, setImagePlaydoyercontext] = useState()
    const [filterImage, setFilterImage] = useState('ASC')
    const [filterVideo, setFilterVideo] = useState('ASC')

    
    
    useEffect(() => { 
        window.scrollTo(0, 0)
        getAllPlaidoyerDESC(pageInit, filterImage)
        getVideoPlaidoyerDESC(pageInitVideo, filterVideo)
        if(plaidoyer !== newPlaidoyer){
            setNewPlaidoyer(plaidoyer) 
        }
        if(videoPlaidoyer !== newPlaidoyerVideo){
            setNewPlaidoyerVideo(videoPlaidoyer) 
        }
    }, []);

    const sliderRef = useRef()
    const sliderRefVideo = useRef()
    const sliderRefModal = useRef()
    

    const nextModal = () => {
        sliderRefModal.current.slickNext();
    };

    // Trigger previous method to show the previous slides
    const previousModal = () => {
        sliderRefModal.current.slickPrev();
    };
    const nextGallery = () => {
        getAllPlaidoyerDESC(pageInit+1, filterImage)
        setPageInit(pageInit+1)
    };

    // Trigger previous method to show the previous slides
    const previousGallery = () => {
        setPageInit(pageInit-1)
        getAllPlaidoyerDESC(pageInit-1, filterImage)
        
    };

    const nextVideo = () => {
        getVideoPlaidoyerDESC(pageInitVideo+1, filterVideo)
        setPageInitVideo(pageInitVideo+1)
    };

    // Trigger previous method to show the previous slides
    const previousVideo = () => {
        setPageInitVideo(pageInitVideo-1)
        getVideoPlaidoyerDESC(pageInitVideo-1, filterVideo)
    };

    const getAllPlaidoyerASC =async()=>{
    const requestOptions = {
        method: 'GET',
      };
    const data = await fetch(apiURL+"/pledoyer/getallASC",requestOptions);
    console.log("dataaaaa",data);
    const dataJson = await data.json();
    setPlaidoyer(dataJson)
}

const getAllPlaidoyerDESC =async(page, filter)=>{
    let formdata =new FormData()
      formdata.append('page',page)
      formdata.append('nbparpage',6)
      formdata.append('type',filter)
      const requestOptions = {
          method: 'POST',
          body: formdata
        };
    const data = await fetch(apiURL+"/pledoyer/getall",requestOptions);
    const dataJson = await data.json();
    console.log("dataaaaa",dataJson);
    setPlaidoyer(dataJson)
}

    const getVideoPlaidoyerASC =async()=>{
            
            const requestOptions = {
                method: 'GET',
            };        
            const data = await fetch(apiURL+"/videopledoyer/getallASC", requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                setVideoPlaidoyer(dataJson);   
                console.log(videoPlaidoyer, "mes");                  
            }
        }

    const getVideoPlaidoyerDESC =async(page, filter)=>{
            
        let formdata =new FormData()
        formdata.append('page',page)
        formdata.append('nbparpage',6)
        formdata.append('type',filter)
        const requestOptions = {
            method: 'POST',
            body: formdata
          };        
            const data = await fetch(apiURL+"/videopledoyer/getall", requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                setVideoPlaidoyer(dataJson); 
                console.log("dataJson",dataJson);    
            }
        }

    const getImagePlaidoyerByid = async(el)=>{
            
            const requestOptions = {
                method: 'GET',
            };        
            const data = await fetch(apiURL+"/photopledoyer/getall/"+el.id, requestOptions);
            const dataJson = await data.json();
            if(data.status == 200){
                console.log("ellllll",el);
                setImagePlaidoyer(dataJson);   
                setTitlePlaidoyer(el.titre)
                setDescriptionPlaidoyer(el.description)
                setImagePlaydoyercontext(el)
                setVisibleImage(true)                 
            }
        }

    const getVideo = (video) =>{
        setUniqueVideo(video)
        setVisibleVideo(true)    
    }

    const settingsGallery = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      lazyLoad: 'progressive',
      rows: plaidoyer && plaidoyer.length<5?1:2,
      slidesPerRow: 1,
      appendDots: (dots) => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
          {/* <button>"20"</button> */}
           {/* onClick={prevClick}  onClick={nextClick}*/}
            <div className="dots-arrow dots-prev" onClick={previousGallery} >
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
            {/* {prevClick({})} */}
          </li>
            <span onClick={console.log("here",dots)}>{dots}</span>
          <li>
          {/* {nextClick({})} */}
            <div className="dots-arrow dots-next" onClick={nextGallery} >
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
             mobileFirst: true,
            slidesToShow: 2,
            initialSlide: 0,
            rows: 1,
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
    };

    const settingsVideo = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 3,
      rows: videoPlaidoyer && videoPlaidoyer.length<6?2:3,
      slidesPerRow: 1,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
          {/* <button>"20"</button> */}
           {/* onClick={prevClick}  onClick={nextClick}*/}
            <div className="dots-arrow dots-prev" onClick={previousVideo} >
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
            {/* {prevClick({})} */}
          </li>
            {dots} 
          <li>
          {/* {nextClick({})} */}
            <div className="dots-arrow dots-next" onClick={nextVideo} >
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
             mobileFirst: true,
            slidesToShow: 2,
            initialSlide: 0,
            rows: 1,
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
    };

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
                visible={visibleImage}
                onOk={() => setVisibleImage(false)}
                onCancel={() => setVisibleImage(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                
            >
            <div className="modal-container">
            <Slider {...settingsImage} ref={slider => (sliderRefModal.current = slider)}>
            {imagePlaidoyer && imagePlaidoyer.map((el)=>(                 
                <div>    
                <center>            
                    <Image src={el.data} className="img-preview"/>
                </center>
                </div>   
            ))}             
            </Slider>
            <div className={props.auth.lang+"_media-modal-flex"}>
                {props.auth.lang=='fr'?<h2 className={props.auth.lang+"_modal-title"}>{imagePlaydoyercontext&&imagePlaydoyercontext.titre}</h2> : <h2 className={props.auth.lang+"_modal-title"}>{imagePlaydoyercontext&&imagePlaydoyercontext.titrear}</h2>}
            </div>    
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{imagePlaydoyercontext&& imagePlaydoyercontext.description}</p> : <p className={props.auth.lang+"_modal-content"}>{imagePlaydoyercontext&& imagePlaydoyercontext.descriptionar}</p>}
                <a className="media-source-button" disabled={imagePlaydoyercontext && imagePlaydoyercontext.source==undefined} target="_blank" rel="noopener noreferrer" href={imagePlaydoyercontext && imagePlaydoyercontext.source}>Source <ExportOutlined style={{paddingLeft:10}}/></a>
            </div>
            </Modal>
            <Modal                
                centered
                visible={visibleVideo}
                onOk={() => setVisibleVideo(false)}
                onCancel={() => setVisibleVideo(false)}
                cancelButtonProps = {false}
                className="video-modal"
                bodyStyle={{padding:70}}
                closeIcon="fermer"
                footer={null}
                destroyOnClose={true}
                
            >
            <div className="modal-container">
                {/* <video className="video-in-modal" width="90%" height="auto" controls >
                    <source src={Video} type="video/mp4"/>
                </video> */}
                <div class="video-container">
                <YouTube videoId={uniqueVideo && uniqueVideo.path.substr(32,11)} opts={opts} onReady={onReady} />

                    {/* <ReactPlayer className="youtube-video" url={uniqueVideo && uniqueVideo.path} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/> */}
                </div>
                <div className={props.auth.lang+"_media-modal-flex"}>
                {props.auth.lang=='fr'?<h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titre}</h2> : <h2 className={props.auth.lang+"_modal-title"}>{uniqueVideo && uniqueVideo.titrear}</h2>}
                    </div>                    
                
                <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.date}</p>
                {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.description}</p> : <p className={props.auth.lang+"_modal-content"}>{uniqueVideo && uniqueVideo.descriptionar}</p>}
            </div>
            </Modal>
            {/* Plaidoyer Image-Text */}
            {/* <section className="slider-plaidoyer-section">
                <h1 className="plaidoyer-title">Plaidoyer</h1>
                <div className="plaidoyer-slider-shadow"></div>
            </section> */}
            <section className="slider-plaidoyer-section">
                <h1 className={props.auth.lang+"_ressources-title"}>{getLanguage(props).resourcesTitle}</h1>
                <div className="ressources-slider-shadow"></div>
            </section>
            {/* Plaidoyer Text */}
            <section className="plaidoyer-text-section">
            {props.auth .lang =='fr'?<p className={props.auth.lang+"_plaidoyer-text"}>{getLanguage(props).plaidoiyerTextOne}<br /><br /> 

            {getLanguage(props).plaidoiyerTextTwo}</p>:<p className={props.auth.lang+"_plaidoyer-text"}>{getLanguage(props).plaidoiyerTextThree}<br /><br /> 

            {getLanguage(props).plaidoiyerTextFour}</p>}
                
            </section>
            <section className={props.auth.lang+"_plaidoyer-content-header"}>
                    <div className={props.auth.lang+"_plaidoyer-content-header-left"}>
                        <span className="plaidoyer-title-decoration"></span>
                        <h2 className={props.auth.lang+"_plaidoyer-activity-title"}>{getLanguage(props).activityTitle}</h2>
                    </div>
                    <div className="plaidoyer-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getAllPlaidoyerDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getAllPlaidoyerASC(0,"DESC")} /></div>
                    </div>
            </section>            
            <section className="plaidoyer-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settingsGallery}>
                {plaidoyer && plaidoyer.length !==0 ? plaidoyer.map((el)=>(
                    <div className="plaidoyer-activity-card" onClick={() => getImagePlaidoyerByid(el)} >                                       
                    <div className="img-container">                     
                   
                        <img src={apiURL+"/photopledoyer/getall/"+el['id']+"/thumb.jpg"} height={'100%'} />                        
                       
                        <div className={props.auth.lang+"_plaidoyer-activity-card-banner"} style={{backgroundColor: "#FECC17"}}>
                            <span className="plaidoyer-activity-date">
                            {/* <Moment format="DD/MM/YYYY"> */}
                            {getCurrentLocalDate(props,el.date)}
                            {/* </Moment> */}
                            </span>
                            {props.auth.lang== 'fr'?<h3 className={props.auth.lang+"_plaidoyer-activity-card-title"}>{el.titre.length <= 15? el.titre: el.titre.substring(0,15)+"..."}</h3>:<h3 className={props.auth.lang+"_plaidoyer-activity-card-title"}>{el.titrear.length <= 15? el.titrear: el.titrear.substring(0,15)+"..."}</h3>}                             
                        </div>
                        </div>
                    </div>
                )):<Empty />}
                </Slider>
                <div className='slick-dots'>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
            <div className="dots-arrow dots-prev" onClick={previousGallery} >
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
          </li>
            <li className="point-pagination_react_slick"></li>
          <li>
            <div className="dots-arrow dots-next" onClick={nextGallery} >
                <img className="dots-arrow-size" src={rightarrow} style={{margin:0}}/>
            </div>
          </li>
          </ul>
        </div>
            </section>

            {/* /***************Video*****************  */}
            <section className={props.auth.lang+"_plaidoyer-content-header"} style={{marginTop: 80}}>
                    <div className={props.auth.lang+"_plaidoyer-content-header-left"}>
                        <span className="plaidoyer-title-decoration" style={{backgroundColor: "#FF9966"}}></span>
                        <h2 className={props.auth.lang+"_plaidoyer-activity-title"}>{getLanguage(props).activityTitleVideo}</h2>
                    </div>
                    <div className="plaidoyer-activity-pagination">
                        <div className="pagination-display"><span className={props.auth.lang+"_pagination-text"}>{getLanguage(props).paginationText}</span><DownOutlined className="pagination-icon" onClick={()=>getVideoPlaidoyerDESC(0,"ASC")} /><UpOutlined className="pagination-icon" onClick={()=>getVideoPlaidoyerDESC(0,"DESC")} /></div>
                    </div>
            </section>
            <section className="plaidoyer-slider-section">
                <Slider ref={slider => (sliderRefVideo.current = slider)} {...settingsVideo}>
                {videoPlaidoyer && videoPlaidoyer.length !==0 ? videoPlaidoyer.map((el)=>(
                    <div className="plaidoyer-activity-card" onClick={() => getVideo(el)} >                                       
                    <div className="img-container">    
                    <img src={player} className="video-player"/>                  
                       
                        <img src={apiURL+"/videopledoyer/get/"+el['id']+"/thumb.jpg"} height={'100%'} />                        
                       
                        <div className={props.auth.lang+"_plaidoyer-activity-card-banner"} style={{backgroundColor: "#FF9966"}}>
                            <span className="plaidoyer-activity-date">
                            {/* <Moment format="DD/MM/YYYY"> */}
                            {getCurrentLocalDate(props,el.date)}
                            {/* </Moment> */}
                            </span>
                            {props.auth.lang=='fr'?<h3 className={props.auth.lang+"_plaidoyer-activity-card-title"}>{el.titre.length <= 25? el.titre: el.titre.substring(0,25)+"..."}</h3>:<h3 className={props.auth.lang+"_plaidoyer-activity-card-title"}>{el.titre.length <= 25? el.titre: el.titre.substring(0,25)+"..."}</h3>}
                                                        
                        </div>
                        </div>
                    </div> 
                )):<Empty />}            
                </Slider>
                <div className='slick-dots'>
          <ul style={{ margin: "0px", padding: "0px" }}> 
          <li>
            <div className="dots-arrow dots-prev" onClick={previousVideo} >
                <img className="dots-arrow-size" src={leftarrow} style={{margin:0}}/>
            </div>
          </li>
            <li className="point-pagination_react_slick"></li>
          <li>
            <div className="dots-arrow dots-next" onClick={nextVideo} >
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Plaidoyer);