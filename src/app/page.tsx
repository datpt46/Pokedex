import Pokemon from '@/components/pokemon';
import Pagination from '@/components/ui/pagination';
import LoadingSkeleton from '@/components/ui/skeleton';
import { regexNumber } from '@/constants/regex';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function fetchPokemons(
  offset: number,
  limit: number
): Promise<ResponsePokemons> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  if (res.status === 404) {
    notFound();
  }

  if (res.status !== 200) {
    throw new Error('Failed to fetch pokemons');
  }

  return res.json();
}

async function fetchPokemon(name: string): Promise<ResponsePokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (res.status !== 200) {
    throw new Error('Failed to fetch pokemon');
  }
  return res.json();
}

export default async function Home({ searchParams }: PageProps) {
  const { page } = searchParams;

  if (
    page === '' ||
    (page && !regexNumber.test(page as string)) ||
    (page && regexNumber.test(page as string) && Number(page) < 1)
  ) {
    throw new Error('Page Invalid');
  }

  const limit = 18;
  const offset = limit * (Number(page) - 1);

  const data = await fetchPokemons(offset, limit);

  const promises = data.results.map((dataPokemon) => {
    return fetchPokemon(dataPokemon.name);
  });

  const pokemons = await Promise.all(promises);

  return (
    <>
      <Pagination next={Boolean(data.next)} previous={Boolean(data.previous)} />
      <div className="mb-4"></div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-4 sm:grid-cols-1 sm:gap-4 lg:text-left">
        {pokemons.map((pokemon) => {
          const { name } = pokemon;
          return (
            <div key={name}>
              <Suspense fallback={<LoadingSkeleton />}>
                <Pokemon data={pokemon} />
              </Suspense>
            </div>
          );
        })}
      </div>
    </>
  );
}
