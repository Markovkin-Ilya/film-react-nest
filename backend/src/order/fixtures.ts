const ticket = {
  film: '0354a762-8928-427f-81d7-1656f717f39c',
  session: 'd3f54ca3-8e19-4b63-afd4-6a8d03933339',
  daytime: '2024-06-28T10:00:53+03:00',
  day: '28 июня',
  time: '10:00',
  row: 1,
  seat: 1,
  price: 350,
};

const taken = {
  film: '0354a762-8928-427f-81d7-1656f717f39c',
  session: 'd3f54ca3-8e19-4b63-afd4-6a8d03933339',
  daytime: '2024-06-28T10:00:53+03:00',
  day: '28 июня',
  time: '10:00',
  row: 1,
  seat: 1,
  price: 350,
  id: '77b25de3-8d0a-48bb-ae63-b07b152d56d2',
};

const order = {
  items: [taken],
};

const requestForOrder = {
  email: '123@gmail.com',
  phone: '+78005553535',
  taken: [ticket],
};

export const orderFixtures = {
  requestForOrder,
  order,
};
