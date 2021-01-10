const option1 = {
  option: 1,
  name: 'get outdoors',
  img: 'https://media.giphy.com/media/33F5USzk3gJdZTinpS/giphy.gif',
  phase2: {
    create: [
    { 
      option: 1,
      name: 'go hiking or biking',
      img: 'https://media.giphy.com/media/dZRCL4lz0lZKdlckNp/giphy.gif',
      results: {
        create: [
        {
          name: '20 best hikes near vancouver',
          url: 'https://www.explore-mag.com/20-of-the-Best-Hiking-Trails-near-Vancouver'
        },
        {
          name: '5 best bike rides in metro vancouver',
          url: 'https://vancouversun.com/news/local-news/5-best-bike-rides-in-metro-vancouver'
        }]
      }
    },
    { 
      option: 2,
      name: 'play mini golf',
      img: 'https://media.giphy.com/media/O2kFK6fdz217a/giphy.gif',
      results: {
        create: {
          name: '10 spots to play mini golf in vancouver',
          url: 'https://www.savvymom.ca/article/mini-golf-vancouver'
        }
      }
    },
    { 
      option: 3,
      name: 'have a park or beach hang',
      img: 'https://media.giphy.com/media/KGz8qEN28Q1O0/giphy.gif',
      results: {
        create: [
        {
          name: '11 best parks in vancouver',
          url: 'https://www.cntraveler.com/gallery/best-parks-in-vancouver'
        },
        {
          name: 'locals guide to the best beaches in vancouver',
          url: 'https://www.theunconventionalroute.com/vancouver-beaches'
        }]
      }
    }]
  }
};

const option2 = {
  option: 2,
  name: 'go out',
  img: 'https://media.giphy.com/media/3oz8xO9TDYd5HxXDUY/giphy.gif',
  phase2: {
    create: [{ 
      option: 1,
      name: 'go to a bar or restaurant',
      img: 'https://media.giphy.com/media/WEdghkflLfKE0/giphy.gif',
      results: {
        create: [{
          name: 'best group friendly restaurants in vancouver',
          url: 'https://www.10best.com/destinations/canada/vancouver/restaurants/group-friendly'
        },
        {
          name: 'ultimate guide to vancouver craft beer',
          url: 'https://foodietours.ca/the-ultimate-guide-to-drinking-craft-beer-in-vancouver'
        },
        {
          name: 'make reservations online',
          url: 'https://www.opentable.ca/promo.aspx?m=73&pid=64'
        }]
      }
    },
    { 
      option: 2,
      name: 'go clubbing',
      img: 'https://media.giphy.com/media/MJL5ae814FDTW/giphy.gif',
      results: {
        create: {
          name: 'best nightclubs in vancouver',
          url: 'https://theculturetrip.com/north-america/canada/vancouver/articles/the-10-best-nightclubs-in-vancouver'
        }
      }
    },
    { 
      option: 3,
      name: 'see a movie',
      img: 'https://media.giphy.com/media/Bzebpz5rnyBb2/giphy.gif',
      results: {
        create: {
          name: 'local movie showtimes',
          url: 'https://www.cineplex.com'
        }
      }
    }]
  }
};

const option3 = {
  option: 3,
  name: 'stay in',
  img: 'https://media.giphy.com/media/3orieYmXYkhT6OxoFq/giphy.gif',
  phase2: {
    create: [{ 
      option: 1,
      name: 'play some board games',
      img: 'https://media.giphy.com/media/jSVNWawkSIO9odplcJ/giphy.gif',
      results: {
        create: {
          name: 'best board games of 2020',
          url: 'https://www.vulture.com/article/best-board-games-of-2020.html'
        }
      }
    },
    { 
      option: 2,
      name: 'play games online',
      img: 'https://media.giphy.com/media/cgCMnZr84zE40/giphy.gif',
      results: {
        create: {
          name: 'best online games to play with friends',
          url: 'https://parade.com/1012420/nicolepajer/best-online-games'
        }
      }
    },
    { 
      option: 3,
      name: 'have a house party',
      img: 'https://media.giphy.com/media/13jxyFwcS7dsdy/giphy.gif',
      results: {
        create: [{
          name: '100 best party songs',
          url: 'https://www.timeout.com/london/music/best-party-songs'
        },
        {
          name: '10 fun drinking games',
          url: 'https://www.scoopwhoop.com/inothernews/fun-drinking-games'
        }]
      }
    }]
  }
};

module.exports = {option1, option2, option3};