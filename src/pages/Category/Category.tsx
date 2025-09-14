import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Category() {
    const [token, setToken] = useState<string>('');

    const { categoryId } = useParams();
    const location = useLocation();
    console.log(location);
    useEffect(() => {
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
        // https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
        async  function getCategory(){
            try{
                const res = await fetch(`https://opentdb.com/api_count.php?category=${categoryId}`);
                const category = await  res.json();
                console.log(category)
            }
            catch (e) {
                console.error(e)
            }
        }
        getCategory()
    }, []);
    return (
        <div>{categoryId}</div>
    );
}

export default Category;