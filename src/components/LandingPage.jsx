import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux"
import { Row, Col, Empty, Tooltip } from 'antd';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import movie from '../assets/img/movie.png'
import projectionsdebats from '../assets/img/projections-débats.png'
import archives from '../assets/img/archives.png'
import temoignages from '../assets/img/temoignages.png'
import plaidoyer from '../assets/img/plaidoyer.png'
import leftarrow from '../assets/img/left-arrow.png'
import rightarrow from '../assets/img/right-arrow.png'
import slideritem1 from '../assets/img/slider-item1.png'
import dochouse from '../assets/img/doc-house-logo.png'
import afak from '../assets/img/afak-logo.png'
import ugtt from '../assets/img/ugtt-logo.png'
import ftdes from '../assets/img/ftdes-logo.png'
import ltdh from '../assets/img/ltdh.png'
import addIcon from '../assets/img/add-icon.png'
import placeholder from '../assets/img/placeholder-img.png'
import Video from '../assets/video/SurLaTransversale.mp4'
import { apiURL } from "../Config/Config";
import getLanguage from "./utilFunction/language"

var arrayPartenaire = []
var arrayPartenaireLocaux = []
const LandingPage = (props) => {

    const [partenaire, setpartenaire] = useState()
    const [programme, setprogramme] = useState()
    const [Images, setImages] = useState();
    const [pageInit, setPageInit] = useState(0)
    const [newProgramm, setNewProgramm] = useState();

    useEffect(() => {
        getAllPartenaire()
        // getAllProgramme() 
        getAllProgramme(pageInit)
        if (programme !== newProgramm) {
            setNewProgramm(programme)
        }

        window.scrollTo(0, 0)
    }, []);


    // const nextGallery = () => {
    //     getAllMediaDESC(pageInit+1, filterImage)
    //     setPageInit(pageInit+1)
    // };

    // // Trigger previous method to show the previous slides
    // const previousGallery = () => {
    //     setPageInit(pageInit-1)
    //     getAllMediaDESC(pageInit-1, filterImage)
    // };

    const next = () => {
        getAllProgramme(pageInit + 1)
        setPageInit(pageInit + 1)
    };

    // Trigger previous method to show the previous slides
    const previous = () => {
        setPageInit(pageInit - 1)
        getAllProgramme(pageInit - 1)
    };
    // Last Events Slider Conf 
    const NextArrow = () => {
        return (
            <div className="arrow next" onClick={next}>
                <img className="arrow-size" src={rightarrow} />
            </div>
        );
    };


    const PrevArrow = () => {
        return (
            <div className="arrow prev" onClick={previous}>
                <img className="arrow-size" src={leftarrow} />
            </div>
        );
    };
    const getImage = (base64) => {
        var image = new Image();
        // console.log("douta",image.src=base64);
        return image.src = base64;
    }
    const getAllPartenaire = async () => {
        const requestOptions = {
            method: 'GET',
        };
        const data = await fetch(apiURL + "/partenaire/getall", requestOptions);
        console.log("dataaaaa", data);
        const dataJson = await data.json();
        dataJson.forEach(element => {
            if (element.type == "Partenaires") {
                arrayPartenaire.push(element)
            }
            else {
                arrayPartenaireLocaux.push(element)
            }

        });
        setpartenaire(dataJson)


    }

    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    rows: 4,
                }
            }
        ],
        rows: 2,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    // Local Partners Slider Conf
    const SmallNextArrow = ({ onClick }) => {
        return (
            <div className="small-arrow small-next" onClick={onClick}>
                <img className="small-arrow-size" src={rightarrow} />
            </div>
        );
    };

    const SmallPrevArrow = ({ onClick }) => {
        return (
            <div className="small-arrow small-prev" onClick={onClick}>
                <img className="small-arrow-size" src={leftarrow} />
            </div>
        );
    };


    const getPartenaireImage = (partenaire) => {

        return (
            <Col span={6}>
                {/* <img src={el.logo} className="slider-img" /> */}

                <span>{partenaire.type}</span>
            </Col>
        )
    }
    const returnPartenaireImage = () => {
        partenaire && partenaire.forEach((el) => {
            if (el.type == "Partenaires") {
                return (
                    <Col>
                        <img src={getImage(el.logo)} width="77px" height='75px' className="slider-img-parternaire" />
                    </Col>
                )
            } else {
                return null
            }
        }

        )
    }
    const getAllProgramme = async (page) => {
        let formdata = new FormData()
        formdata.append('page', page)
        formdata.append('nbparpage', 4)
        formdata.append('type', "ASC")
        const requestOptions = {
            method: 'POST',
            body: formdata
        };
        const data = await fetch(apiURL + "/programme/getall", requestOptions);
        console.log("dataaaaa", data);
        const dataJson = await data.json();
        console.log('hereeee', dataJson);
        setprogramme(dataJson)
    }

    const getImageEvent = async (id = 1) => {
        try {
            const requestOptions = {
                method: 'GET',
            };
            const data = await fetch(apiURL + "/programme/get/" + id + "/full.jpg", requestOptions);
            if (data.status == 200) {
                const dataJson = await data.json();
                setImages(dataJson)
            }
        } catch (error) {
            console.log(error);

        }

    }

    const partnerSettings = {
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        row: 1,
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SmallNextArrow />,
        prevArrow: <SmallPrevArrow />
    };
    const partnerLocauxSettings = {
        centerMode: false,
        infinite: false,
        centerPadding: 0,
        row: 1,
        slidesToShow: 4,
        speed: 500,
        nextArrow: <SmallNextArrow />,
        prevArrow: <SmallPrevArrow />
    };

    const goProjection = () => {
        window.location = "/projection"
    }
    const goArchive = () => {
        window.location = "/archive"
    }
    const goTémoignages = () => {
        window.location = "/testimonial"
    }
    const goPlaidoyer = () => {
        window.location = "/Plaidoyer"
    }
    console.log("test", programme);
    const redirectTo = () => {
        window.location = '/program';
    }

    return (
        <div>
            {/* Synopsis section */}
            <section className="slider-video-section">
                <video width="100%" height="auto" controls >
                    <source src={Video} type="video/mp4" />
                </video>
            </section>
            <section className="synopsis-section">
                <Row style={props.auth.lang == 'ar' ? { direction: "rtl" } : null}>
                    <Col xs={24} sm={24} md={12}>
                        <h2 className={props.auth.lang + "_synopsis-title"}>{getLanguage(props).Synopsis}</h2>
                        <p className={props.auth.lang + "_synopsis-content"}>{getLanguage(props).SynopsisParag1}<br /><br />
                            {getLanguage(props).SynopsisParag2}</p>
                    </Col>
                    {props.auth.lang == 'fr' ? <Col xs={24} sm={24} md={12} className={props.auth.lang + "_synopsis-padding"}>
                        <h2 className={props.auth.lang + "_synopsis-title"}>{getLanguage(props).SynopsisParag3}</h2>
                        <p className={props.auth.lang + "_synopsis-content"}>{getLanguage(props).SynopsisParag4}<br /><br />
                            {getLanguage(props).SynopsisParag5}
                        </p>
                    </Col> :
                        <Col xs={24} sm={24} md={12} className={props.auth.lang + "_synopsis-padding"}>
                            <h2 className={props.auth.lang + "_synopsis-title"}>{getLanguage(props).SynopsisParag3}</h2>
                            <p className={props.auth.lang + "_synopsis-content"}>{getLanguage(props).SynopsisParag4}<br /></p>
                            <p className={props.auth.lang + "_synopsis-content"}>{getLanguage(props).SynopsisParag44}<br /></p>
                            <p className={props.auth.lang + "_synopsis-content"}>{getLanguage(props).SynopsisParag5}</p>

                        </Col>}
                </Row>
            </section>
            {/* Movie section */}
            <section className="movie-section">
                <Row className="movie-section-flex" align="middle" gutter={45}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={16}>
                        <div className="left-grid-movie-section">
                            <h2 className={props.auth.lang + "_movie-title"}>
                                {getLanguage(props).movieTitle}
                            </h2>
                            <p className={props.auth.lang + "_movie-content"}>
                                {getLanguage(props).movieContent1}
                            </p>
                            <p className={props.auth.lang + "_movie-content"}>
                                {getLanguage(props).movieContent2}
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                        <img src={movie} className="movie-img mobileHidden" />
                    </Col>
                </Row>
            </section>
            {/* Companion activity */}
            <section className="companion-activity-section">
                <div className={props.auth.lang + "_companion-activity-title-display"}>
                    <span className="companion-activity-title-decoration"></span>
                    {props.auth.lang == 'fr' ? <h2 className={props.auth.lang + "_companion-activity-title"}>{getLanguage(props).activiteTitle} <br />{getLanguage(props).activiteTitle2}</h2> :
                        <h2 className={props.auth.lang + "_companion-activity-title"}>{getLanguage(props).activiteTitle}</h2>}
                </div>
                <Row gutter={[20, 60]} justify="space-between">
                    <Col xs={24} sm={24} md={12} lg={6} >
                        <div className="section-landing-page">
                            <div className="companion-activity-img-container">
                                <img src={projectionsdebats} className="companion-activity-img" onClick={goProjection} />
                                <div className="hover-bar-yellow">
                                    <img src={addIcon} className="add-button" onClick={goProjection} />
                                </div>
                            </div>
                            {props.auth.lang == 'fr' ? <h2 className={props.auth.lang + "_companion-activity-img-title"} onClick={goProjection}>{getLanguage(props).projection1} <br /> {getLanguage(props).projection2}</h2> :
                                <h2 className={props.auth.lang + "_companion-activity-img-title"} onClick={goProjection}>{getLanguage(props).ProjectionsDébats}</h2>}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="section-landing-page">
                            <div className="companion-activity-img-container">
                                <img src={archives} className="companion-activity-img" onClick={goArchive} />
                                <div className="hover-bar-red">
                                    <img src={addIcon} className="add-button" onClick={goArchive} />
                                </div>
                            </div>
                            <h2 className={props.auth.lang + "_companion-activity-img-title"} onClick={goArchive} >{getLanguage(props).Archive}</h2>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="section-landing-page">
                            <div className="companion-activity-img-container">
                                <img src={temoignages} className="companion-activity-img" onClick={goArchive} />
                                <div className="hover-bar-unknown">
                                    <img src={addIcon} className="add-button" onClick={goArchive} />
                                </div>
                            </div>
                            <h2 className={props.auth.lang + "_companion-activity-img-title"} onClick={goArchive}>{getLanguage(props).Témoignages}</h2>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="section-landing-page">
                            <div className="companion-activity-img-container">
                                <img src={plaidoyer} className="companion-activity-img" onClick={goArchive} />
                                <div className="hover-bar-blue">
                                    <img src={addIcon} className="add-button" onClick={goArchive} />
                                </div>
                            </div>
                            <h2 className={props.auth.lang + "_companion-activity-img-title"} onClick={goArchive}>{getLanguage(props).Plaidoyer}</h2>
                        </div>
                    </Col>
                </Row>
            </section>
            <section className="events-section">
                <div className={props.auth.lang + "_events-section-title-display"}>
                    {props.auth.lang == 'fr' ? <h2 className={props.auth.lang + "_events-section-title"}>
                        {getLanguage(props).lastEvent1} <br /> {getLanguage(props).lastEvent2}
                    </h2> : <h2 className={props.auth.lang + "_events-section-title"}>
                        {getLanguage(props).lastEvent1}
                    </h2>}
                    <div className="events-section-title-decoration"></div>
                </div>
                <div className="events-section-slider">

                    <Slider {...settings} >
                        {programme && programme.length !== 0 ? programme.map((el) => (
                            <div className="event-card" onClick={redirectTo}  >
                                <Tooltip title={props.auth.lang == 'fr' ? el.description : el.descriptionar}>
                                    <div className="event-card-overlay" >
                                    </div>

                                    <img src={apiURL + "/programme/get/" + el['id'] + "/thumb.jpg"} className="event-img" />
                                    {props.auth.lang == 'fr' ? <h3 className="event-title-card">{(el.title || "").length <= 25 ? el.title : el.title.substring(0, 25) + "..."}</h3> : <h3 className="event-title-card">{(el.titlear || "").length <= 25 ? el.titlear : el.titlear.substring(0, 25) + "..."}</h3>}
                                </Tooltip>
                            </div>
                        )) : <Empty />}
                        <div className='slick-dots'>

                        </div>
                    </Slider>
                    {/* <Slider {...settings}>
                <div>
                <Row gutter={[18,18]}>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                </Row>
                </div>
                <div>
                <Row gutter={[18,18]}>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                </Row>
                </div><div>
                <Row gutter={[18,18]}>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                    <Col sm={24} md={12}>
                        <img src={slideritem1} className="slider-img"/>
                    </Col>
                </Row>
                </div>
                </Slider> */}
                </div>
            </section>
            {/* Organizing collective section */}
            <section className="collective-section">
                <div className={props.auth.lang + "_collective-title-display"}>
                    <span className="collective-section-title-decoration"></span>
                    <h2 className={props.auth.lang + "_collective-section-title"}> {getLanguage(props).CollectifOrganisateur} </h2>
                </div>
                <div className="collective-icons-block">
                    <img src={dochouse} className="collective-icon" />
                    <img src={afak} />
                    <img src={ugtt} />
                    <img src={ftdes} />
                    <img src={ltdh} />
                </div>

                <Row className="partners-row" justify="center" gutter={[0, 40]}>
                    <Col xs={24} sm={24} md={12}>
                        <h3 className={props.auth.lang + "_local-partners-title"}>
                            {getLanguage(props).PartenaireLocaux}
                        </h3>
                        <Slider {...partnerLocauxSettings} className="local-partners-slider">
                            {arrayPartenaireLocaux && arrayPartenaireLocaux.map((el) => (
                                <div style={{ width: "82px", height: "100px" }}>
                                    <center>
                                        <img src={getImage(el.logo)} className="slider-img-parternaire" />
                                    </center>
                                </div>
                            ))}
                        </Slider>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <h3 className={props.auth.lang + "_partners-title"}>
                            {getLanguage(props).Partenaire}
                        </h3>
                        <Slider {...partnerSettings} className="local-partners-slider">
                            {arrayPartenaire && arrayPartenaire.map((el) => (
                                <div>
                                    <center>
                                        <img src={getImage(el.logo)} width="82px" height='auto' className="slider-img-parternaire" />
                                    </center>
                                </div>
                            ))}
                        </Slider>
                    </Col>
                </Row>
            </section>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

