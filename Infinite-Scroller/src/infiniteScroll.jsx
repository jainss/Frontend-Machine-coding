import { useCallback, useEffect, useRef, useState } from "react";

export default function InfiniteScroll(props) {

    const { renderlistItem, getData, listDate, query } = props;
    const pageNumber = useRef(1);
    const [loading, setLoading] = useState(false);

    const observer = useRef(null);
    const lastElementObserver = useCallback(node => {
        if(loading){
            return ;
        }
        if(observer.current){
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting){
                pageNumber.current+=1;
                fetchData();
            }
        })

        if(node){
            observer.current.observe(node);
        }
    })

    const renderList = useCallback(()=>{
        return listDate.map((item, index)=>{
            if(index === listDate.length-1){
                return renderlistItem(item, index, lastElementObserver) 
            }
            return renderlistItem(item, index, null)
           
        })
    })

    const fetchData = useCallback(()=>{
        setLoading(true);
        getData(query, pageNumber.current).finally(()=>{
            setLoading(false);
        })
    }, [query])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (<div>
        {renderList()}
        {loading && "Loading..."}
    </div>)

}