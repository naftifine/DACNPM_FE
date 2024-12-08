import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({ to, href, primary = false, outline = false, text = false, rounded = false, disabled = false, small = false, large = false, children, className, leftIcon, rightIcon, onClick, ...passProps }) {
    let Comp = 'button';
    const classes = cx('wrapper', { primary, outline, small, large, text, rounded, disabled, [className]: className, leftIcon, rightIcon });
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    }
    else if (href) {
        props.href = href;
        Comp = 'a';

    }


    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx(`icon`)}>{leftIcon}</span>}
            <span className={cx(`title`)}>{children}</span>
            {rightIcon && <span className={cx(`icon`)}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;