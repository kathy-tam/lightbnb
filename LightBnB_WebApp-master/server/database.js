const properties = require('./json/properties.json');
const users = require('./json/users.json');

//Setup pg and connect to database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE id = $1;`, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user;
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [name, email, password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`
  SELECT * FROM reservations
  JOIN properties ON property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

    if(Object.keys(options).length !== 0) {
      queryString += `WHERE `
    }

    const queryOptions = [];

    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryOptions.push(`city LIKE $${queryParams.length} `);
    }

    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryOptions.push(`owner_id = $${queryParams.length} `);
    }

    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night*100}`);
      queryOptions.push(`cost_per_night >= $${queryParams.length} `);
    }

    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night*100}`);
      queryOptions.push(`cost_per_night <= $${queryParams.length} `);
    }
    
    queryString += queryOptions.join(' AND ');

    // 4
    queryString += `
    GROUP BY properties.id
    `;

    // HAVING
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    }

    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
    // 5
    console.log(queryString, queryParams);
  
    // 6
    return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const { owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms } = property;
  return pool.query(`
  INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, [owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code])
  .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
