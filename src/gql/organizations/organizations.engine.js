const dummyOrgs = [
  {
    id: 1,
    name: 'Dorne',
    taxId: '1j30ej92f2fes2',
    imageUrl:
      'https://media.cntraveler.com/photos/5718fc273658675c4f786709/4:3/w_480,c_limit/game-of-thrones-alazar-of-seville-02-cr-alamy-EHD2RD.jpg',
  },
  {
    id: 2,
    name: 'Vaes Dothrak',
    taxId: '8dh287df23h4h',
    imageUrl:
      'https://vignette.wikia.nocookie.net/gameofthrones/images/1/1e/S6VaesDothrak.png/revision/latest?cb=20170819033612',
  },
  {
    id: 3,
    name: "King's Landing",
    taxId: 'f98sd823hkjgbb',
    imageUrl: 'https://live.staticflickr.com/4314/35128208234_514c8a1ac9_b.jpg',
  },
  {
    id: 4,
    name: 'The Wall',
    taxId: '98ahshdhshsh12',
    imageUrl:
      'https://timedotcom.files.wordpress.com/2017/08/game-of-thrones-the-wall-history-03.jpg',
  },
]

const OrganizationsModel = context => ({
  fromId: async id => {
    return dummyOrgs[id < dummyOrgs.length ? id - 1 : 0]
  },
  fromName: name => {
    for (let idx in dummyOrgs) {
      if (dummyOrgs[idx].name === name) return dummyOrgs[idx]
    }
    return {}
  },
  create: ({ name, taxId, imageUrl }) => {
    // ADMIN ONLY
    const newOrg = {
      name,
      taxId,
      imageUrl,
      id: dummyOrgs.length,
    }
    dummyOrgs.push(newOrg)
    return newOrg
  },
})

export default OrganizationsModel
