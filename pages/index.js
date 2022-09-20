import Link from "next/link";
import { useQuery } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PaginationPage(props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["games", page],
    async () =>
      await fetch(
        `https://api.rawg.io/api/games?key=4291ed9152f84825ab9a062319652c80&page=${page}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
    }
  );
  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`?page=${value}`, undefined, { shallow: true });
  }
  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);
  return (
    <div>
      <h1>
        GG Commerce
      </h1>
      <Pagination
        count={data?.count}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
      <div className='grid-container'>
        {data?.results?.map((game) => (
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
        count={data?.count}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
    </div>
  );
}