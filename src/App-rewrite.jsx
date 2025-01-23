import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults />
      </NavBar>

      <Main>
        <Box></Box>
        <Box></Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Logo() {
  return <div className="logo"></div>;
}

function Search({ query, setQuery }) {
  return (
    <div className="finding">
      <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
      <input className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Movies name..." />
    </div>
  );
}

function NumResults() {
  return <div className="num-results"></div>;
}

function Main() {
  return <div className="main"></div>;
}

function Box() {
  return <div className="box"></div>;
}
