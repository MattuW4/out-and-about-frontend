import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import EventPage from "./pages/events/EventPage";
import EventsPage from "./pages/events/EventsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventEditForm from "./pages/events/EventEditForm";




function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (

    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (
            <EventsPage message="No results found. Adjust keyword for your search." />
          )}
          />
          <Route exact path="/whatson" render={() => (
            <EventsPage message="No results found. Adjust keyword for your search or subscribe to a user."
              filter={`owner__subscribed__owner__profile=${profile_id}&`}
            />
          )}
          />
          <Route exact path="/attending" render={() => (
            <EventsPage message="No results found. Adjust keyword for your search or select 'attending' on an event."
              filter={`attending__owner__profile=${profile_id}&ordering=-attending__created_at&`}
            />
          )}
          />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/events/create" render={() => <EventCreateForm />} />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route exact path="/events/:id/edit" render={() => <EventEditForm />} />
          <Route render={() => <p>Whoops! Page not found...</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;