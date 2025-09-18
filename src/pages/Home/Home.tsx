import {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {fetchCategories, fetchToken} from "../../store/quizSlice.ts";

function Home() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { token, categories, isLoading, error } = useSelector((state: RootState) => state.quiz);
    //
    // const [token, setToken] = useState<string>('');
    // const [categoryList, setCategoryList] = useState<[{id:number, name:string}]|null>(null);
    // const [error, setError] = useState<null | string>(null);
    // const [loading, setLoading] = useState<Boolean>(true);
    // useEffect(()=>{
    //     async function getToken(){
    //         try{
    //             const res = await fetch('https://opentdb.com/api_token.php?command=request');
    //             const TOKEN = await  res.json();
    //             setToken(TOKEN.token);
    //         }
    //         catch (e) {
    //             console.error(e)
    //         }
    //
    //     }
    //     getToken();
    //     async  function getCategory(){
    //         try{
    //             const res = await fetch('https://opentdb.com/api_category.php');
    //             const category = await  res.json();
    //             setCategoryList(category.trivia_categories)
    //             console.log(category);
    //             setError(null);
    //         }catch (e:any) {
    //             setError(e.message);
    //             setCategoryList(null)
    //             console.error(e)
    //         }finally {
    //             setLoading(false);
    //         }
    //     }
    //     getCategory()
    // },[])
    // if (loading){
    //     return <div>Loading...</div>;
    // }
    useEffect(() => {
        // Запрашиваем токен и категории только если их нет
        if (!token) {
            dispatch(fetchToken());
        }
        if (!categories) {
            dispatch(fetchCategories());
        }
    }, [dispatch, token, categories]);

    if (isLoading) {
        return <div >Loading...</div>;
    }

    if (error) {
        return <div >Error: {error}</div>;
    }
    return (
        <div >
            <h1>Categories</h1>
            <ul >
                {categories?.map((category) => (
                    <li  key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;