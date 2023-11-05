const challenges = [
  {
    theme: 'Points',
    detail: 'A map with points',
  },
  {
    theme: 'Lines',
    detail: 'A map with lines',
  },
  {
    theme: 'Polygons',
    detail: 'A map with polygons',
  },
  {
    theme: 'A bad map',
    detail: "Let's get this over with",
  },
  {
    theme: 'Analog Map',
    detail: 'Non-digital maps',
  },
  {
    theme: 'Asia',
    detail: 'Largest of the continents',
  },
  {
    theme: 'Navigation',
    detail: 'A map that helps you to navigate',
  },
  {
    theme: 'Africa',
    detail: 'Second-largest and second-most populous continent',
  },
  {
    theme: 'Hexagons',
    detail: '6 sides, 6 angles, and 6 vertices',
  },
  {
    theme: 'North America',
    detail: 'Northern part of the American continent',
  },
  {
    theme: 'Retro',
    detail: 'A blast from the past',
  },
  {
    theme: 'South America',
    detail: 'Southern part of the American continent',
  },
  {
    theme: 'Choropleth',
    detail: 'Classic thematic map: a choropleth',
  },
  {
    theme: 'Europe',
    detail: 'The westernmost peninsulas of Eurasia',
  },
  {
    theme: 'OpenStreetMap',
    detail: 'The greatest of the datasets. Remember to give credit.',
  },
  {
    theme: 'Oceania',
    detail:
      'Region made up of thousands of islands throughout the Central and South Pacific',
  },
  {
    theme: 'Flow',
    detail: 'Flow of transport, people',
  },
  {
    theme: 'Atmosphere',
    detail: 'Conditions of the atmosphere can be either weather or climate',
  },
  {
    theme: '5-minute map',
    detail: 'Spend no more than 5 minutes to prepare this map',
  },
  {
    theme: 'Outdoors',
    detail: 'Map of mountains, trails, or something completely different',
  },
  {
    theme: 'Raster',
    detail: 'Pixels, please',
  },
  {
    theme: 'North is not always up',
    detail: '⬆️',
  },
  {
    theme: '3D',
    detail: 'The third dimension',
  },
  {
    theme: 'Black & white',
    detail: 'Only two colors allowed',
  },
  {
    theme: 'Antarctica',
    detail: "A cold continent that can't be reached with Web Mercator",
  },
  {
    theme: 'Minimal',
    detail: 'Less is more',
  },
  {
    theme: 'Dot',
    detail: 'Dot density, a single dot in space or something different',
  },
  {
    theme: 'Is this a chart or a map?',
    detail:
      "In thematic maps, you can't always tell. Try to stretch the limits",
  },
  {
    theme: 'Population',
    detail: 'A classic theme for a map',
  },
  {
    theme: '"My favorite.."',
    detail: 'You choose!',
  },
];

export default function Page() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ marginTop: '25px' }}>#30DayMapChallenge</h1>
      <div style={{ marginTop: '25px', fontSize: '1.5em' }}>
        <ul>
          {[...Array(30).keys()].map((i) => {
            // use padStart
            const day = (i + 1).toString().padStart(2, '0');
            return (
              <li key={day} style={{ marginTop: '10px' }}>
                <a href={`/2023/11/${day}`} title={challenges[i].detail}>
                  2023-11-{day}: {challenges[i].theme}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
