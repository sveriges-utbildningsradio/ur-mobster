const mobsterNames = [
  'Al Capone',
  'John Gotti',
  'Bugsy Siegel',
  'Meyer Lansky',
  'Sam Giancana',
  'Henry Hill',
  'Carlo Gambino',
  'Vito Genovese',
  'Frank Costello',
  'Salvatore Lo Piccolo'
]

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const generateMobsterName = () => {
  const i = getRandomInt(mobsterNames.length)

  return mobsterNames[i]
}

export default generateMobsterName
