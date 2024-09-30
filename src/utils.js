export default async function fetchJSONData(directory, query) {
    let result;

    let url = "http://localhost:5000" + directory;
    if (query.length > 0)
        url += "?"
    for (let q of query)
        url += q[0] + "=" + (q[1] == "" ? " " : q[1]) + "&"
    console.log("url: ", url)
    await fetch(url)
      .then((res) => {
          if (!res.ok) {
              throw new Error
                  (`HTTP error! Status: ${res.status}`);
          }
          return res.json();
      }).then((data) => result = data)
    return result
}