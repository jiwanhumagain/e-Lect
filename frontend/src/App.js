import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import About from "./pages/AboutUs";
import Register from "./components/VoterRegistration";
// import Voting from "./components/voting";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
// import Admin from "./components/Admin";
import { VotingProvider } from "./context/Voter";
import VoterList from "./pages/VoterList";
import CandidateRegistraion from "./pages/CandidateRegistration";
import Candidate from "./pages/candidate";
function App() {
  return (
    <VotingProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/register" exact element={<Register />} />
            {/* <Route
              path="/voting"
              exact
              element={<Voting Component={Voting} pageProps={{}} />}
            /> */}
            <Route path="/voterlist" exact element={<VoterList />} />
            <Route path="/howitworks" exact element={<HowItWorks />} />
            <Route path="/features" exact element={<Features />} />

            <Route path="/voting" exact element={<Candidate />} />
            <Route path="/admin" exact element={<CandidateRegistraion />} />

            {/* <Route path="/admin" exact element={<Admin />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </VotingProvider>
  );
}

export default App;
