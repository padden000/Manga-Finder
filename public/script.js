async function searchManga() {
  const title = document.getElementById("mangaInput").value;

  const response = await fetch(`/search?title=${title}`);

  const data = await response.json();

  const resultDiv = document.getElementById("result");

  if (data.success) {
    resultDiv.innerHTML = `
      <h3>配信サイト</h3>
      <ul>
        ${data.sites.map(site => `<li>${site}</li>`).join("")}
      </ul>
    `;
  } else {
    resultDiv.innerHTML = `
      <p>${data.message}</p>
    `;
  }
}