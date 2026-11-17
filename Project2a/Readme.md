# Music Information APP

**Author(s):** Amina Soltana

## Project plan

### Project idea
For users who want a quick, clean interface to look up artists, read their biographies, and explore their top albums and tracks in the album in one place.

### Planned features

- **Artist Search & Quick-Select Dropdown:** Search for any artist by name via a text input or pick from a preset dropdown menu of artists.

- **Artist Profile & Biography View:** Automatically display the top matching artist's profile, photo (kinda), and biography summary.

- **Top Albums & Top Tracks Explorer:** Fetch and dynamically render the selected artist's top 4 albums and top of the album with cover artwork.

### Wireframe / sketch
![Wireframe](./path-to-your-wireframe.png)
<img width="1268" height="1082" alt="image" src="https://github.com/user-attachments/assets/9621a265-e8fd-407d-9614-9e0b2dc8798a" />


---

## Web links
- **Published application:** https://moonchild030.github.io/Web-Development-1-Front-End-TO00CD50-3003/Project2a/Music%20App/
- **GitHub repository:** https://github.com/Moonchild030/Web-Development-1-Front-End-TO00CD50-3003/tree/main/Project2a
- **Project video presentation:** https://video.laurea.fi/media/Project+2a%3A+AJAX+Application+Using+a+REST+API/0_3fsu9mo6
  

---

## About the application

**Music Information APP** is a single-page web application that connects to the Last.fm REST API to retrieve and display real-time music metadata. Users can search for an artist or select one from a curated dropdown list to view matching artist cards, read an artist summary, and browse their top 4 albums and top 4 tracks.

## Technologies
- **HTML5** Semantic page structure, search controls, dropdown selector, and containers for search results, artist details, albums, and tracks.

- **CSS3** – Custom styling, pastel card-based layout, and responsive visual hierarchy.

- **JavaScript (ES6 Modules)** – Asynchronous API communication (`async/await`, `fetch`), modular API wrapper (`lastfmapi.js`), data filtering/sorting, and dynamic DOM manipulation (`document.createElement`).

- **Last.fm API** – External data source providing artist search matches, artist biographies, top albums, and top tracks.

## How to use the application
1. Open the published application using the GitHub Pages link above.
2. Select a preset artist from the dropdown menu **or** type an artist's name into the search bar and click **Search**.
3. Browse the matching artist cards, read the artist's biography, and view their top 4 albums and tracks.

---

## Screenshots
<img width="1892" height="908" alt="Screenshot 2026-11-17 045258" src="https://github.com/user-attachments/assets/f4edd14d-bb0b-4bd5-b24c-070d37590a55" />



---

## Known issues / limitations
- All arts on Last.fm return placeholder star icons.




---

## Self-assessment and learning reflection
- **What did I succeed in?**

  - Building a separate API wrapper module (`lastfmapi.js`) to keep API keys and URL construction separated from DOM rendering logic, and dynamically creating HTML elements with JavaScript.

- **What was challenging?**
  - Working with asynchronous `fetch` calls, handling nested JSON responses from the Last.fm API, and updating multiple sections of the DOM cleanly with loops. I also thought making the list of artists the API provides shorter a bit challenging so I had to google it. Also nesting is still an annoyingly hard for me and causes issues with my code from time to time.

- **What would I improve if I had more time?**
  - Add localstorage so the search results stays when user refreshes the page and maybe how to fix the star images. 

  
- **What did I learn about HTML, CSS, JavaScript and DOM scripting?**
  - How ES6 modules organize code across files, how `async/await` manages external API requests, and how to clear and rebuild DOM containers dynamically using `forEach` loops.

- **What remained unclear or what would I like to learn more about?**
  - To reduce how much information the API gives to me. 

- **My self-assessed project grade:** `xx/10 points`

---

## Sources and acknowledgements
- **API Documentation:** [Last.fm API Documentation](https://www.last.fm/api) (`artist.search`, `artist.getinfo`, `artist.gettopalbums`, `artist.gettoptracks`)

- **Images / Illustrations:** https://pin.it/4eXhlDkpi -cat png

- **AI tool used:** Gemini / ChatGPT 

  - **How the tool was used:** to fix nesting yet again and also debugging 
