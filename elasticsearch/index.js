const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
});

const indexName = 'cart';

const mapCartBody = {
  properties: {
    user_id: { type: 'integer' },
    item: {
      type: 'nested',
      properties: {
        p_id: { type: 'integer' },
        quantity: { type: 'integer' },
      },
    },
    total_price: { type: 'float' },
    item_count: { type: 'integer' },
  },
};

const addCartBody = (document) => {
  return {
    index: indexName,
    type: 'document',
    body: {
      user_id: document[0],
      item: document[1],
      total_price: document[2],
      item_count: document[3],
    },
  };
};

const mapAddressBody = {
  properties: {
    street_address: { type: 'text' },
    city: { type: 'text' },
    state: { type: 'text' },
    zipcode: { type: 'text' },
    longitude: { type: 'float' },
    latitude: { type: 'float' },
  },
};

const addAddressBody = (document) => {
  return {
    index: indexName,
    type: 'document',
    body: {
      street_address: document[0],
      city: document[1],
      state: document[2],
      zipcode: document[3],
      longitude: document[4],
      latitude: document[5],
    },
  };
};
/**
* Delete an existing index
*/
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName,
  });
}


/**
* create the index
*/
function initIndex() {
  return elasticClient.indices.create({
    index: indexName,
  });
}


/**
* check if the index exists
*/
function indexExists() {
  return elasticClient.indices.exists({
    index: indexName,
  });
}


const initMapping = () => {
  const doc = 'document';
  return elasticClient.indices.putMapping({
    index: indexName,
    type: doc,
    body: mapAddressBody,
  });
};

function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: 'document',
    body: addAddressBody(document),
  });
}
deleteIndex();
// initIndex()
//   .then(() => {
//     return initMapping();
//   });


module.exports = {
  initMapping,
  indexExists,
  initIndex,
  deleteIndex,
  addDocument,
};