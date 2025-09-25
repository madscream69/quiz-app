import styles from "./Button.module.scss";

function Button(props:{text:string, onClick:()=>void}) {
    return (
        <button onClick={props.onClick} className={styles.btn}>
            {props.text}
        </button>
    );
}

export default Button;