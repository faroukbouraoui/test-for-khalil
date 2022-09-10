import React, { useState, useEffect, useRef, usePrevious } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, DatePicker, Modal, Empty, Image  } from 'antd';
import { DownOutlined, UpOutlined, ExportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moment from 'react-moment';
import leftarrow from '../../assets/img/left-arrow.png'
import rightarrow from '../../assets/img/right-arrow.png'
import moment from "moment";
import { apiURL } from "../../Config/Config";
import getLanguage from "../utilFunction/language"
import getCurrentLocalDate from "../utilFunction/currentLocalDate"

const Article = (props)=>{
    const newArray = [];
    function  usePrevious(value){
        const ref = useRef();
        useEffect(() => {
           ref.current = value;
        });
        return ref.current;
      }
    const [articleById, setarticleById] = useState()
    const [visibleImage, setVisibleImage] = useState(false);
    const [articles, setArticles] = useState()
    const [article, setArticle] = useState()
    const [classNameFilter, setClassNameFilter] = useState({filter1:"filter-button active", filter2:"filter-button",filter3:"filter-button",filter4:"filter-button"})
    // const [filter,setFilter] =useState()
    const [order,setOrder] =useState("ASC")
    const [date,setDate] =useState({dateFrom:'',dateTo:''})
    const [filterDateASC, setFilterDateASC] = useState(true)
    const [filterDateDESC, setFilterDateDESC] = useState(false)
    const [filterDate, setFilterDate] = useState(false)
    const [source, setSource] = useState(false)
    const [pageInit, setPageInit] = useState(0)
    const [newArticles, setNewArticles] = useState();
    const [filter, setFilter] = useState({datedebut:'1900-01-01',datefin:moment().format("YYYY-MM-DD"),typeoftrie:'ASC',type:''})

    useEffect(() => {
        window.scrollTo(0, 0)
        getAllPaginatedArticles(pageInit, filter.type, filter.typeoftrie, filter.datedebut, filter.datefin)
        if(articles !== newArticles){
            setNewArticles(articles)
        }
    }, []);
    const sliderRef = useRef()
    const next = () => {
        getAllPaginatedArticles(pageInit+1, filter.type, filter.typeoftrie,filter.datedebut, filter.datefin)
        setPageInit(pageInit+1)
    };

    const previous = () => {
        setPageInit(pageInit-1)
        getAllPaginatedArticles(pageInit-1, filter.type, filter.typeoftrie,filter.datedebut, filter.datefin) 
    };
 

    const { RangePicker } = DatePicker;

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
    responsive: [
        {
        breakpoint: 767,
        settings: {
            slidesToShow: 1,            
        }
        }
    ],
    dots: true,
    nextArrow: <NextImageArrow />,
    prevArrow: <PrevImageArrow />
    };



    const settings = {
      className: "center",
      centerMode: false,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 1,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll:4,
      rows:  articles && articles.length<4?1:3,
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
            rows: articles && articles.length<4?1:2,            
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
    const getImageArticleByid =async(el)=>{
        setArticle(el)
        setSource(el.source)
        setVisibleImage(true)
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+"/photoarticle/getall/"+el.id,requestOptions )
        const dataJson = await data.json();
        console.log("test photo",dataJson);
        if(data.status == 200){
            setarticleById(dataJson)
        }  
    }


    const getAllArticle =async(order)=>{
        setFilterDate(false)
        setFilter()
        setClassNameFilter({filter1:"filter-button active", filter2:"filter-button",filter3:"filter-button",filter4:"filter-button"})
        const requestOptions = {
            method: 'GET',
          };
        const data = await fetch(apiURL+"/article/getall", requestOptions);
        const dataJson = await data.json();
        if(data.status == 200){
            console.log(dataJson);
            if(order == "ASC"){
                setArticles(dataJson);
            }
            if(order == "DESC"){
                const arr = dataJson.reverse()
                setArticles(arr);
            }
            
        }
    }
    const onChange=async(dates, dateStrings)=> {
        let newState = {...filter, datedebut: moment(dateStrings[0]).format("YYYY-MM-DD"), datefin:moment(dateStrings[1]).format("YYYY-MM-DD") }
        setFilter(newState)
        getAllPaginatedArticles(pageInit+1, filter.type, filter.typeoftrie,moment(dateStrings[0]).format("YYYY-MM-DD"), moment(dateStrings[1]).format("YYYY-MM-DD"))
      }
    
     const getAllPaginatedArticles =async (page, type, typeoftrie,datedebut, datefin)=>{
         let newState = {...filter, typeoftrie:typeoftrie, type: type }
         setFilter(newState)
        if(type == "Presse Internationale"){
            setClassNameFilter({filter1:"filter-button", filter2:"filter-button active",filter3:"filter-button",filter4:"filter-button"})
        }
        if(type == "Presse Tunisienne"){
            setClassNameFilter({filter1:"filter-button", filter2:"filter-button",filter3:"filter-button active",filter4:"filter-button"})
        }
        if(type == "Article Academique"){
            setClassNameFilter({filter1:"filter-button", filter2:"filter-button",filter3:"filter-button",filter4:"filter-button active"})
        }
        if(type == ""){
            setClassNameFilter({filter1:"filter-button active", filter2:"filter-button",filter3:"filter-button",filter4:"filter-button"})
        }
        let formdata =new FormData()
        formdata.append('datedebut', datedebut)
        formdata.append('datefin',datefin)
        formdata.append('typeoftrie',typeoftrie)
        formdata.append('nbpage',12)
        formdata.append('page',page)
        formdata.append('type',type)
        const requestOptions = {
            method: 'POST',
            body:formdata
          };
        const data = await fetch(apiURL+"/article/getallbytypedate",requestOptions);
        if(data.status == 200){
            const dataJson = await data.json();
            dataJson.forEach(element => {
                newArray.push(element[0])
            });
            setArticles(newArray) 
        }
      }

      console.log("fiiiiiiiiilter",filter);

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
            <Slider {...settingsImage}>
            {articleById && articleById.map((el)=>(               
                <div>
                <center>
                    <Image src={el.data} className="img-preview"/>
                    
                    </center>{/* <img src={getImage(el.data)} style={{width: "50%", height: "50%", margin:"0 auto"}}/> */}
                </div>
            ))}             
            </Slider>    
            <div className={props.auth.lang+"_media-modal-flex"}> 
                {props.auth.lang == 'fr'?<h2 className={props.auth.lang+"_modal-title"}>{article&& article.title}</h2> : <h2 className={props.auth.lang+"_modal-title"}>{article&& article.titlear}</h2>}
                {/* <a className="media-source-button" disabled target="_blank" rel="noopener noreferrer" href="#">Source <ExportOutlined style={{paddingLeft:10}}/></a> */}
            </div>            
            {props.auth.lang == 'fr'?<p className={props.auth.lang+"_modal-content"}>{article && article.description}</p> : <p className={props.auth.lang+"_modal-content"}>{article && article.descriptionar}</p>}
            <a className="media-source-button" disabled={source==undefined} target="_blank" rel="noopener noreferrer" href={source}>Source <ExportOutlined style={{paddingLeft:10}}/></a>

            </div>
        </Modal>
            {/* article Image-Text */}
            <section className={props.auth.lang+"_slider-article-section"}>
                <h1 className={props.auth.lang+"_article-title"}>{getLanguage(props).Archives1}<br />{getLanguage(props).Articles}</h1>
                <div className="article-slider-shadow"></div>
            </section>
            <section className="article-text-section">
                <p className={props.auth.lang+"_article-text"}>{getLanguage(props).ArchivesText}</p>
            </section>
            <section className="article-filter-section">
                        <div className="filter-button-display">
                            <div className={classNameFilter.filter1 + ' '+props.auth.lang+"_styleFilter"} onClick={()=>getAllPaginatedArticles(pageInit, filter.type = "", filter.typeoftrie, filter.datedebut, filter.datefin)}>{getLanguage(props).TousLesArticles}</div>
                            <div className={classNameFilter.filter2 + ' '+props.auth.lang+"_styleFilter"} onClick={()=>getAllPaginatedArticles(pageInit, filter.type = "Presse Internationale", filter.typeoftrie, filter.datedebut, filter.datefin)} >{getLanguage(props).PresseInternationale}</div>
                            <div className={classNameFilter.filter3 + ' '+props.auth.lang+"_styleFilter"} onClick={()=>getAllPaginatedArticles(pageInit, filter.type = "Presse Tunisienne", filter.typeoftrie, filter.datedebut, filter.datefin)}>{getLanguage(props).PresseTunisienne}</div>
                            <div className={classNameFilter.filter4 + ' '+props.auth.lang+"_styleFilter"} onClick={()=>getAllPaginatedArticles(pageInit, filter.type = "Article Academique", filter.typeoftrie, filter.datedebut, filter.datefin)}>{getLanguage(props).ArticleAcademique}</div>
                            {/* <a href="#" className="filter-button">Articles récents</a> */}
                            <a className="filter-button">
                            <RangePicker 
                                className={props.auth.lang+"_date-range"} 
                                placeholder={[getLanguage(props).DateDeDébut,getLanguage(props).DateDeFin]} 
                                bordered={false}
                                style={{height:30, fontSize:20}}
                                onChange={onChange}
                                />
                            </a>
                            <div className="article-activity-pagination">
                                <div className="pagination-display">
                                    <span className={props.auth.lang+"_article-pagination-text"}>{getLanguage(props).TrierParDate}</span>
                                    <DownOutlined className="pagination-icon" onClick={()=>getAllPaginatedArticles(pageInit, filter.type, filter.typeoftrie ="DESC", filter.datedebut, filter.datefin)}/>
                                    <UpOutlined className="pagination-icon" onClick={ ()=>getAllPaginatedArticles(pageInit, filter.type, filter.typeoftrie ="ASC", filter.datedebut, filter.datefin)} />
                                </div>
                            </div>                            
                        </div>
            </section>
            <section className="article-slider-section">
                <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
                    {articles && articles.length !== 0 ? articles.map((el)=>(
                        <div className="article-card" onClick={()=>getImageArticleByid(el)}>
                        <div className="img-article-container">
                        <img src={apiURL+"/photoarticle/get/"+el['photo_id']+"/thumb.jpg"} height={'100%'}/>   
                        </div>
                        <div className="article-banner-container">
                            <div className="article-banner">
                                <div className={props.auth.lang+"_article-upper-text"}>
                                    {/* <Moment format="DD/MM/YYYY"> */}
                                        <span className="article-date">{getCurrentLocalDate(props,el.date)}</span>
                                    {/* </Moment> */}
                                    {/* <span className="article-card-title">media</span> */}
                                </div>
                                {props.auth.lang == 'fr'?<h3 className={props.auth.lang+"_article-card-article"}>{el.title.length <= 10 ? el.title: el.title.substring(0,15)+"..."}</h3> : 
                                <h3 className={props.auth.lang+"_article-card-article"}>{el.titlear.length <= 10 ? el.titlear: el.titlear.substring(0,15)+"..."}</h3>}
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Article);