import { useState, useEffect } from "react";
import { xml2json, parseXml } from "./xml2json.js";
import "./App.css";
import Content from "./components/Content/Content.jsx";

const ruv =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://www.ruv.is/rss/frettir");

const visir =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://www.visir.is/rss/allt");

const mbl =
  "https://corsproxy.io/?" + encodeURIComponent("https://www.mbl.is/feeds/fp/");

function App() {
  const [ruvRss, setRuvRss] = useState();
  const [visirRss, setVisirRss] = useState();
  const [mblRss, setMblRss] = useState();
  const [id, setId] = useState(0);
  useEffect(() => {
    let xml, json, parsed;
    //FETCH RUV RSS FEED
    fetch(ruv)
      .then((response) => response.text())
      .then((data) => {
        xml = parseXml(data);
        json = xml2json(xml, "");
        parsed = JSON.parse(json);
        setRuvRss(parsed.rss.channel.item);
      })
      .catch((error) => console.error(error));
    //FETCH VISIR RSS FEED
    fetch(visir)
      .then((response) => response.text())
      .then((data) => {
        xml = parseXml(data);
        json = xml2json(xml, "");
        parsed = JSON.parse(json);
        setVisirRss(parsed.rss.channel.item);
      })
      .catch((error) => console.error(error));
    //FETCH MBL RSS FEED
    fetch(mbl)
      .then((response) => response.text())
      .then((data) => {
        xml = parseXml(data);
        json = xml2json(xml, "");
        parsed = JSON.parse(json);
        setMblRss(parsed.rss.channel.item);
      })
      .catch((error) => console.error(error));
  }, []);
  if (!visirRss) {
    return <div>..loading</div>;
  } else {
    return (
      <>
        <div className="top-container">
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setId(0);
            }}
          >
            www.ruv.is
          </button>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setId(1);
            }}
          >
            www.visir.is
          </button>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setId(2);
            }}
          >
            www.mbl.is
          </button>
        </div>
        <Content rss={id === 0 ? ruvRss : id === 1 ? visirRss : mblRss} />
      </>
    );
  }
}
export default App;
