import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Asset from "./Asset";
import styles from "../styles/NoResults.module.css";
import NoResults from "../assets/no-results.webp";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";
import { Card } from "react-bootstrap";

const NotFound = () => {
  return (
    <Card className={styles.Event}>
      <Card.Body>
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
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                aria-label="Return to homepage button"
              >
                <Link className={styles.Link} to={"/"}>
                  Click here to return to the Homepage
                </Link>
              </Button>
            </div>
          </div>
        </>
      </Card.Body>
    </Card>
  );
};

export default NotFound;