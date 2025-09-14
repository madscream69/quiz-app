import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

function Home() {
    const location = useLocation();
    console.log(location);

    const [token, setToken] = useState<string>('');
    const [categoryList, setCategoryList] = useState<[{id:number, name:string}]|null>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<Boolean>(true);
    useEffect(()=>{
        async function getToken(){
            try{
                const res = await fetch('https://opentdb.com/api_token.php?command=request');
                const TOKEN = await  res.json();
                setToken(TOKEN.token);
            }
            catch (e) {
                console.error(e)
            }

        }
        getToken();
        async  function getCategory(){
            try{
                const res = await fetch('https://opentdb.com/api_category.php');
                const category = await  res.json();
                setCategoryList(category.trivia_categories)
                console.log(category);
                setError(null);
            }catch (e:any) {
                setError(e.message);
                setCategoryList(null)
                console.error(e)
            }finally {
                setLoading(false);
            }
        }
        getCategory()
    },[])
    if (loading){
        return <div>Loading...</div>;
    }
    return (
        <>
            <h1>Categories</h1>
            <ul>
                {
                    categoryList?.map((category)=>{
                        return <li className='card' key={category.id}>
                            <Link to={`/category/${category.id}`}>{category.name}</Link>
                        </li>
                    })
                }
            </ul>
        </>
    );
}

export default Home;