import React, {useEffect, useState} from "react";
import Film from "Components/films/Film";
import {Row, Col} from "rsuite";
import {Paxios} from "config/axios.config";

const FilmBuilder = () => {
  const [filmData, setFilmData] = useState([
    {
      FID: 1,
      title: "ACADEMY DINOSAUR",
      description:
        "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
      category: "Documentary",
      price: 0.99,
      length: 86,
      rating: "PG",
      actors:
        "PENELOPE GUINESS, CHRISTIAN GABLE, LUCILLE TRACY, SANDRA PECK, JOHNNY CAGE, MENA TEMPLE, WARREN NOLTE, OPRAH KILMER, ROCK DUKAKIS, MARY KEITEL",
    },
    {
      FID: 2,
      title: "ACE GOLDFINGER",
      description:
        "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
      category: "Horror",
      price: 4.99,
      length: 48,
      rating: "G",
      actors: "BOB FAWCETT, MINNIE ZELLWEGER, SEAN GUINESS, CHRIS DEPP",
    },
    {
      FID: 3,
      title: "ADAPTATION HOLES",
      description:
        "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
      category: "Documentary",
      price: 2.99,
      length: 50,
      rating: "NC-17",
      actors:
        "NICK WAHLBERG, BOB FAWCETT, CAMERON STREEP, RAY JOHANSSON, JULIANNE DENCH",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const request = async () => {
    const res = await Paxios.get("/film/list")
      .then((request) => request)
      .catch((err) => err.response);
    if (res.status == 200) {
      const {data} = res;
      setFilmData(data.res);
      setLoading(false);
    }
    console.log(res, "desde dede");
  };
  useEffect(() => {
    request();
  }, []);
  const content = filmData.map((el) => {
    return (
      <Col md={6} sm={12}>
        <Film data={el} />
      </Col>
    );
  });

  return (
    <Row>{loading ? <h1>...Cargando Datos, Por favor espere</h1> : content}</Row>
  );
};

export default FilmBuilder;
