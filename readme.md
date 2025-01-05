# [HeroHero Downloader Example](https://cloneherobymatt.tiiny.site/)

### **Current Downloaded Profile:**  
**French not only with Teri (Czech)**

---

## **What is HeroHero Downloader?**  
**HeroHero Downloader** is a web-based application designed to download and archive media content directly from HeroHero subscriptions. The application leverages your account’s login cookies and profile username to save all media and posts from your subscribed HeroHero profiles.  

### **Key Advantages**  
- **Access Offline Media Forever:** Download and keep all HeroHero media, even after your subscription ends.  
- **Effortless Media Management:** HeroHero media links and playlists remain unchanged, allowing for easy storage in a `.json` file for use as a media database.  
- **Simple User Interface:** Access your saved content through an intuitive frontend.

---

## **How to Use the Application**  

### **1. File Structure**  
The app is divided into two main folders:  
- **`data_scrape`**: For scraping and downloading content from HeroHero.  
- **`frontend`**: For displaying the downloaded content in a user-friendly way.

---

### **2. Scraping Data**  
To begin downloading content, navigate to the `data_scrape` folder and run the `postDownloader.py` script using Python.  

#### **Steps to Follow:**  
1. **Obtain Access Cookies:**  
   - Open your browser's developer tools (e.g., Chrome DevTools).  
   - Navigate to the **Network tab** while logged into the HeroHero website.  
   - Find a POST request, and copy the **entire `Cookie` header**.  

2. **Find the Real Username:**  
   - In the same Network tab, search for `user` in the responses.  
   - Locate a response containing a JSON object with `"users" > "id"`.  
   - Use this username as input for the script. _(Note: This is **not** the URL username.)_  

3. **Run the Script:**  
   - Execute the script, which will prompt you for:  
     - **Access Cookies**  
     - **Username of the Profile**  
   - The script will:  
     - Call the HeroHero GraphQL API to retrieve all post IDs.  
     - Save these IDs in `/data/{username}/postIDs.json`.  
     - Fetch post data and media links via the HeroHero API.  
     - Save the data in `/data/{username}/postsData.json`.  

#### **End Result:**  
You now have all the media content downloaded and saved locally in a structured format!

---

### **3. Displaying Content**  
1. Navigate to the `frontend` folder.  
2. Copy the generated `postsData.json` file from `data_scrape/{username}`.  
3. Paste the file into the `frontend` folder and rename it to `data.json`.  
4. Serve the `index.html` file from the `frontend` folder using any local server (e.g., VSCode Live Server or Python's `http.server`).  
5. View and interact with your saved HeroHero content in the browser!

---

## **Features**  
- **Automated Scraping:** Automatically fetches all post data and media links using HeroHero’s API.  
- **Structured Storage:** Saves data in clean `.json` files for easy organization and reuse.  
- **Intuitive Frontend:** Seamlessly displays downloaded content in a visually appealing format.  

---

## **Disclaimer**  
This tool is intended for personal use only. Ensure you comply with HeroHero’s terms of service and only download content you have the right to access.  
This tool was created in less than a day! Dont expect it to be super optimized!

---
