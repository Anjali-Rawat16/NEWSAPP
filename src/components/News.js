import React, { useEffect,useState }from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
const News=(props)=>{
    const[articles,setArticles]=useState([])
    const[loading,setLoading]=useState([true])
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)




    
    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     console.log("hello I am the constructor from news component");
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1
    //     }
    // }

    const updateNews=async() =>{
        props.setProgress(30);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // console.log(parsedData);
      
        props.setProgress(100);

      

    }

    useEffect(()=>{ //it is used in place of componentDidMount
    document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
        updateNews();
        // eslint-disable-next-line 
        
    },[])


    const handlePreviousclick = async () => {
        // console.log("previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false

        // })
        setPage(page-1)
        updateNews();

    }

    const handleNextclick = async () => {
        console.log("next");
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
        //     return;

        // }

        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        setPage(page+1)
        updateNews();



    }

    
        console.log("render");
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>NewsMonkey - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
                {loading && <Spinner />}
                <div className='row'>
                    {!loading
                        && articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={
                        handlePreviousclick}>&larr; Previous</button>
                    <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextclick} >Next &rarr;</button>
                </div>
            </div>
        )
    
    News.defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general',
    }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
}
export default News
