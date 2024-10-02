/**
 * Method used to get a JSON object from the json-server database.
 *
 * @param {string} directory The route where the desired data is.
 * @param {Array.<Array.<string>>} query The conditions to get the desired data. 
 * It is represented by an array with many arrays, each one representing a single condition
 * where the first element of the array is the name of the paramter and the second element
 * is the number or string that refers to the paramter.
 * Example: [["id", "3"], ["name", "John"]].
 * @returns {Promise} Returns an array of objects from the json required.
*/
export default async function fetchJSONServer(directory, query) {
    let url = "http://localhost:5000" + directory;
    if (query.length > 0)
        url += "?"
    for (let q of query)
        url += q[0] + "=" + (q[1] == "" ? " " : q[1]) + "&"
    return fetchJSONData(url);
}

/**
 * Method used to get a JSON object from a JSON file at the given path.
 *
 * @param {string} url The path to the given JSON file.
 * @returns {Promise} An object from the json required.
 */
async function fetchJSONData(url) {
    let result;
    await fetch(url)
      .then((res) => {
          if (!res.ok) {
              throw new Error
                  (`HTTP error! Status: ${res.status}`);
          }
          return res.json();
      }).then((data) => result = data)
    return result;
}