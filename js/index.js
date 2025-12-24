// WRITE YOUR JS CODE HERE


const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetSection = link.dataset.section;

    sections.forEach(section => {
      section.classList.add("hidden");
    });

    document
      .getElementById(targetSection)
      .classList.remove("hidden");

    navLinks.forEach(l => l.classList.remove("bg-blue-500/10", "text-blue-400"));
    link.classList.add("bg-blue-500/10", "text-blue-400");
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   getTodayInSpace();
//   getLaunches();
//   getPlanets();
// });


async function getTodayInSpace() {
  const container = document.getElementById("today-in-space");
  if (!container) return;

  try {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=YOUR_REAL_API_KEY"
    );

    if (!res.ok) throw new Error("NASA API Error");

    const data = await res.json();

    if (data.media_type === "image") {
      container.innerHTML = `
        <img src="${data.url}" class="rounded-lg mb-4" />
        <h3 class="font-semibold">${data.title}</h3>
        <p class="text-slate-400">${data.explanation}</p>
      `;
    } else {
      container.innerHTML = `
        <iframe
          src="${data.url}"
          class="w-full h-96 rounded-lg mb-4"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <h3 class="font-semibold">${data.title}</h3>
        <p class="text-slate-400">${data.explanation}</p>
      `;
    }
  } catch (error) {
    container.innerHTML = `
      <p class="text-red-400">Failed to load today's space image </p>
    `;
    console.error(error);
  }
}


async function getLaunches() {
  const container = document.getElementById("launches-container");
  if (!container) return;

  try {
    const res = await fetch(
      "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
    );

    if (!res.ok) throw new Error("Launches API Error");

    const data = await res.json();
    container.innerHTML = "";

    data.results.slice(0, 5).forEach(launch => {
      container.innerHTML += `
        <div class="p-4 bg-slate-800 rounded-lg">
          <h3 class="font-semibold">${launch.name}</h3>
          <p class="text-sm text-slate-400">
            ${launch.net.split("T")[0]}
          </p>
          <p class="text-sm">
            ${launch.launch_service_provider?.name || "Unknown"}
          </p>
        </div>
      `;
    });
  } catch (error) {
    container.innerHTML = `
      <p class="text-red-400">Failed to load launches </p>
    `;
    console.error(error);
  }
}



async function getPlanets() {
  const container = document.getElementById("planets-container");
  if (!container) return;

  try {
    const res = await fetch(
      "https://solar-system-opendata-proxy.vercel.app/api/planets"
    );

    if (!res.ok) throw new Error("Planets API Error");

    const data = await res.json();
    const planets = data.bodies.filter(body => body.isPlanet);

    container.innerHTML = "";

    planets.forEach(planet => {
      container.innerHTML += `
        <div class="p-4 bg-slate-800 rounded-lg text-center">
          <h3 class="font-semibold">${planet.englishName}</h3>
          <p class="text-sm text-slate-400">
            Gravity: ${planet.gravity ?? "N/A"}
          </p>
        </div>
      `;
    });
  } catch (error) {
    container.innerHTML = `
      <p class="text-red-400">Failed to load planets </p>
    `;
    console.error(error);
  }
}

