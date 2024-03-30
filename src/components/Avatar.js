import styles from '../styles/Avatar.module.css'

// Component to display user profile picture
const Avatar = ({ src, height = 45, text }) => {    
    return (
        <span>
            <img
                className={styles.Avatar}
                src={src}
                height={height}
                width={height}
                alt="avatar"
            />
            {text}
        </span>
    );
};

export default Avatar;