import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  console.log(selectedMovie);
  useEffect(() => {
    Axios.get(
      `https://imdb-api.com/en/API/Title/${API_KEY}/${selectedMovie}/FullActor,Ratings`
    ).then((response) => {
      console.log(response.data);
      setMovieInfo(response.data)
    });
  }, [selectedMovie]); //dodao props.onMovieSelect
  return (
    // Naslov, slika, lista glumaca (API sve vraća) i rating na nekoliko portala
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.image} alt={movieInfo?.title} />
          <InfoColumn>
            { movieInfo.title ? (<MovieName>Title: <span>{movieInfo.title}</span></MovieName>) : null }
            { movieInfo.ratings.imDb ? (<MovieInfo> IMDB Rating: <span>{movieInfo.ratings.imDb}</span></MovieInfo>) : null }
            { movieInfo.ratings.metacritic ? (<MovieInfo> Metacritic: <span>{movieInfo.ratings.metacritic}</span></MovieInfo>) : null }
            { movieInfo.ratings.rottenTomatoes ? (<MovieInfo> Rotten Tomatoes: <span>{movieInfo.ratings.rottenTomatoes}</span></MovieInfo>) : null }
            { movieInfo.ratings.tV_com ? (<MovieInfo> TV.com: <span>{movieInfo.ratings.tV_com}</span></MovieInfo>) : null }
            { movieInfo.ratings.theMovieDb ? (<MovieInfo> The Movie Database: <span>{movieInfo.ratings.theMovieDb}</span></MovieInfo>) : null }
            { movieInfo.ratings.filmAffinity ? (<MovieInfo> Filmaffinity: <span>{movieInfo.ratings.filmAffinity}</span></MovieInfo>) : null }
            <br />
            { movieInfo.starList.length ? ( <MovieInfo>Actors:</MovieInfo>) : null }
              {movieInfo.starList.length ? (
                movieInfo.starList.map((star, index) => (
                  <MovieInfo index={index}><span>{star.name}</span></MovieInfo>
                ))
              ) : (
                null
              )}
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
