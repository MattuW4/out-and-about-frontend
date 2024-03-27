import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Asset from "./Asset";
import styles from "../styles/NoResults.module.css";
import NoResults from "../assets/no-results.png";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";

const NotFound = () => {
  return (
    <>
      <div className={styles.NotFound}>
        <div className={styles.Error404}>404!</div>
        <div className={styles.NotFoundText}>
          Whoops! Page not found...
        </div>
        <div>
          <Asset alt="page not found" src={NoResults} />
        </div>
        <div className={`text-center`}>
          <Button className={`${btnStyles.Button} ${btnStyles.Purple}`}>
            <Link className={styles.Link} to={"/"}>
              Click here to return to the Homepage
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;