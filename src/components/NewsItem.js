// import React, {component} from 'react'

const NewsItem=(props)=>{
        let { title, description, imageUrl, url, author, date, source } = props;
        return (
            <div className='my-3'>
                <div>
                    <div className="card">
                        <div style={{display:'flex',
                        justifycontent:'flex-end',
                        position:'absolute',
                        right:'0',
                        }}>
                        <span className=" badge rounded-pill bg-danger" >
                            {source}
                        </span>
                        </div>
                        <img src={!imageUrl ? "https://blog.tipranks.com/wp-content/uploads/2025/11/shutterstock_2436869207-750x406.jpg" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}
                            </h5>
                            <p className="card-text">{description}</p>
                            <p className='card-text'><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={url} target="_blank" rel="noopener  noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem