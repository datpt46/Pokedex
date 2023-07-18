import ViewImage from './view-image';

const Pokemon = async ({ data }: { data: ResponsePokemon }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg">
      <ViewImage
        srcs={[
          data.sprites.other['official-artwork'].front_default ??
            '/default.png',
          data.sprites.other['official-artwork'].front_shiny ?? '/default.png',
        ]}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl dark:text-slate-200 capitalize mb-2">
          {data.name}
        </div>
        <ul className="text-gray-700 dark:text-slate-200 text-base">
          {data.stats.map((dataStat) => {
            const { stat, base_stat } = dataStat;
            return (
              <div key={stat.url}>
                {stat.name} : {base_stat}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2">
        {data.types.map((dataType) => {
          const { slot, type } = dataType;
          return (
            <span
              key={slot}
              className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2"
            >
              {type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
