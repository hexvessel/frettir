import React, { useEffect, useState } from "react";
import "./Content.css";
import {
  parseChevron,
  parseMBLImage,
  parseMBLText,
  parseRUV,
} from "../../utils/parser";

export default function Content(rss) {
  const [selected, setSelected] = useState(-1);
  const enclosure =
    rss.rss[selected] !== undefined && rss.rss[selected].enclosure !== undefined
      ? rss.rss[selected].enclosure["@url"]
      : "";
  return (
    <div className="content-container">
      <ul className="list">
        {rss.rss.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelected(index)}
            className="list-item"
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className="content-text">
        {selected < 0 ? (
          <h1>veldu frétt</h1>
        ) : rss.rss[0].link.substring(12, 15) === "ruv" ? (
          <>
            <h1>{rss.rss[selected].title}</h1>
            <div className="text-image-container">
              <div className="paragraphs">
                {parseRUV(rss.rss[selected].description).map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
              <img src={enclosure} />
            </div>
            <a href={rss.rss[selected].link}>{rss.rss[selected].link}</a>
          </>
        ) : rss.rss[0].link.substring(12, 15) === "mbl" ? (
          <>
            <h1>{rss.rss[selected].title}</h1>
            <div className="text-image-container">
              {parseMBLText(rss.rss[selected].description).map((res, index) => (
                <p className="paragraphs" key={index}>
                  {res}
                </p>
              ))}
              {parseMBLImage(rss.rss[selected].description) ? (
                parseMBLImage(rss.rss[selected].description).map(
                  (res, index) => <img src={res} key={index} />
                )
              ) : (
                <div></div>
              )}
            </div>
            <a href={rss.rss[selected].link}>{rss.rss[selected].link}</a>
          </>
        ) : (
          <>
            <h1>{rss.rss[selected].title}</h1>
            <p className="paragraphs">{rss.rss[selected].description}</p>
            <a href={rss.rss[selected].link}>{rss.rss[selected].link}</a>
          </>
        )}
      </div>
    </div>
  );
}
