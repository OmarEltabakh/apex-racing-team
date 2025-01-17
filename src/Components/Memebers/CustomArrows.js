
import style from "./Memebers.module.css";

// Custom Next Arrow Component
export function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={`d-flex justify-content-center align-items-center ${style.customArrow} ${style.nextArrow}`}
            onClick={onClick}
        >
            <i className="fa fa-chevron-right"></i>
        </div>
    );
}

// Custom Previous Arrow Component
export function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={`d-flex justify-content-center align-items-center ${style.customArrow} ${style.prevArrow}`}
            onClick={onClick}
        >
            <i className="fa fa-chevron-left"></i>
        </div>
    );
}
