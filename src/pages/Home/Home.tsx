import {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {fetchCategories, fetchToken} from "../../store/quizSlice.ts";
import styles from './Home.module.scss';

function Home() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { token, categories, isLoading, error } = useSelector((state: RootState) => state.quiz);
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
        <div className={styles.main}>
            <h1 className={styles.title}>Categories</h1>
            <div className={styles.category}>
                {categories?.map((category) => (
                    <div className={styles.categoryWrapper} key={category.id}>
                        <Link className={styles.categoryLink} to={`/category/${category.id}`}>{category.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;