import { useState, useMemo, useEffect } from 'react'

/**
 * Method used to get an object from the json-server database.
 *
 * @param {string} directory The route where the desired data is.
 * @param {Array.<Array.<string>>} query The conditions to get the desired data. 
 * It is represented by an array with many arrays, each one representing a single condition
 * where the first element of the array is the name of the paramter and the second element
 * is the number or string that refers to the paramter.
 * Example: [["id", "3"], ["name", "John"]].
 * @returns {Promise} Returns an array of objects from the json required.
*/
export async function fetchJSONServer(directory, query) {
    let url = "http://localhost:5000" + directory;
    if (query.length > 0)
        url += "?"
    for (let q of query)
        url += q[0] + "=" + (q[1] == "" ? " " : q[1]) + "&"
    return fetchJSONData(url);
}

/**
 * Method used to delete data from the json-server database.
 *
 * @param {string} directory The route where the data is.
 * @param {string} query The id of the data to be deleted.
*/
async function deleteJSONServer(directory, id) {
    await fetch("http://localhost:5000" + directory + "/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
    }});
}

/**
 * Method used to update data from the json-server database.
 *
 * @param {string} directory The route where the data is.
 * @param {string} query The id of the data to be updated.
 * @param {object.<...any>} updateData The new data.
*/
async function updateJSONServer(directory, id, updateData) {
    await fetch("http://localhost:5000" + directory + "/" + id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(updateData)
    });
}

/**
 * Method used to create a new entry in the json-server database.
 *
 * @param {string} directory The route where the data is.
 * @param {object.<...any>} newData The new data.
 * @returns {Promise} An object with the new entry.
*/
async function createJSONServer(directory, newData) {
    let result;
    console.log(newData)
    await fetch("http://localhost:5000" + directory, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then((res) => {
        return res.json();
    }).then((data) => result = data);
    return result;
}

/**
 * Method used to get an object from a JSON file at the given path.
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

/**
 * Method used initialize a React state with persist stace, which maintains after reloading the page.
 *
 * @param {string} initial_value The initial value of the state if there is no state already stored.
 * @param {string} id The name of the state.
 * @returns {Array.<any, React.Dispatch.<any>>} An array of two elements, where the first is the state 
 * and the second is the function to set the state.
 * @see {@link https://dev.to/jorensm/how-to-keep-state-between-page-refreshes-in-react-3801} for credits.
 */
export function usePersistState(initial_value, id) {
    const _initial_value = useMemo(() => {
        const local_storage_value_str = localStorage.getItem('state:' + id);
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        }
        return initial_value;
    }, []);

    const [state, setState] = useState(_initial_value);

    useEffect(() => {
        const state_str = JSON.stringify(state);
        localStorage.setItem('state:' + id, state_str)
    }, [state]);

    return [state, setState];
}

/**
 * Method used to delete a post.
 *
 * @param {string} id An id of a Post.
*/
export async function deletePost(id) {
    await deleteJSONServer("/posts", id);
    location.reload();
}

/**
 * Method used to update a post.
 *
 * @param {string} id An id of a Post.
 * @param {any} newData The new data of the post.
*/
export async function updatePost(id, newData) {
  await updateJSONServer("/posts", id, newData);
  location.reload();
}

/**
 * Method used to create a post.
 *
 * @param {any} data The data of the post.
*/
export async function createPost(data) {
    const today = new Date();
    data["postedAt"] = today.toISOString().slice(0,-5);
    await createJSONServer("/posts", data);
    location.reload();
}