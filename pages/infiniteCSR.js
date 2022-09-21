import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

function InfiniteCSRPage() {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1 }) =>
      await fetch(
        `https://api.rawg.io/api/games?key=4291ed9152f84825ab9a062319652c80?page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );
  return (
    <div>
      <h1>
        Infinite Scroll
      </h1>
      {status === "success" && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Prochains Jeux...</h4>}
        >
          <div className='grid-container'>
            {data?.pages.map((page) => (
              <>
                {page.results.map((character) => (
                  <article key={character.id}>
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
              </>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default InfiniteCSRPage;
