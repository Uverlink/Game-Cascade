import React, { Component } from "react";


function GenreBar() {
    const { data } = useQuery(
        ["games", page],
        async () =>
          await fetch(
            `https://api.rawg.io/api/genres?key=4291ed9152f84825ab9a062319652c80&page=${page}`
          ).then((result) => result.json()),
        {
          keepPreviousData: true,
        }
      );
  return (
    <div>GenreBar</div>
  )
}

export default GenreBar