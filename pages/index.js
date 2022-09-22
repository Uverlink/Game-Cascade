import Link from "next/link";
import { useQuery } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PaginationPage(props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const { data:datagame } = useQuery(
    ["games", page, genre],
    async () =>
      await fetch(
        `https://api.rawg.io/api/games?key=4291ed9152f84825ab9a062319652c80&page=${page}` + (genre == null ? '' : `&genres=${genre}`)
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
    }
  );

  const { data:datagenre } = useQuery(
    ["genres", page],
    async () =>
      await fetch('https://api.rawg.io/api/genres?key=4291ed9152f84825ab9a062319652c80').then((result) => 
         result.json()
      ),
    {
      keepPreviousData: true,
    }
  );

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`?page=${value}`, undefined, { shallow: true });
  }

  function handleClickGenre(value)
  {
    setGenre(value);
  }

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);

  return (
    <div>
      <h1>
        Game Cascade
      </h1>
      <div className='genre-container'>
        {datagenre?.results?.map((genre) => (
          <article key={genre.id}
          className="clickable"
            onClick={() => handleClickGenre(genre.id)}
          >
            {<img
              src={genre.image_background}
              alt={genre.name}
              loading='lazy'
              width={"100%"}
              height={"100%"}
              />}
            <div className='text'>
              <p>{genre.name}</p>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        count={datagame?.count}
        variant='outlined'
        color='standard'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
      <div className='grid-container'>
        {datagame?.results?.map((game) => (
          <article key={game.id}>
            <img
              src={game.background_image}
              alt={game.name}
              height={250}
              loading='lazy'
              width={"100%"}
            />
            <div className='text'>
              <p>{game.name}</p>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        count={datagame?.count}
        variant='outlined'
        // color='dcd8c0'r
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
    </div>
  );
}