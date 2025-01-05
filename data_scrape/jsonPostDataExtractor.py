import json
import requests
import os
from tqdm import tqdm  # Progress bar library

# Function to process the JSON response
def extract_post_data(postJson):
    try:
        data = json.loads(postJson)
        result = {
            "description": data["attributes"].get("text", ""),
            "videos": [],
            "images": [],
            "thumbnails": [],
            "attachments": [],
            "date": data["attributes"].get("publishedAt", "")
        }

        # Extract assets
        assets = data["attributes"].get("assets", [])
        for asset in assets:
            if "gjirafa" in asset and asset["gjirafa"] and asset["gjirafa"].get("videoStreamUrl"):
                result["videos"].append(asset["gjirafa"]["videoStreamUrl"])
            if "image" in asset and asset["image"] and asset["image"].get("url"):
                result["images"].append(asset["image"]["url"])
            if asset.get("thumbnail"):
                result["thumbnails"].append(asset["thumbnail"])
            if "document" in asset and asset["document"] and asset["document"].get("url"):
                result["attachments"].append(asset["document"]["url"])

        return result
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON input: {e}")
    except KeyError as e:
        raise ValueError(f"Missing expected key in JSON: {e}")


def main(file_location, user_id, cookie):
    # Read post IDs from posts.json
    with open(file_location, "r", encoding="utf-8") as posts_file:
        post_ids = json.load(posts_file)

    # Create the directory if it doesn't exist
    output_dir = os.path.join("data", user_id)
    os.makedirs(output_dir, exist_ok=True)

    # Output data file
    output_file = os.path.join(output_dir, "postsData.json")

    # Load existing data if the file exists
    try:
        with open(output_file, "r", encoding="utf-8") as data_file:
            data = json.load(data_file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    # Start ID counter
    next_id = len(data) + 1

    # Base URL and headers for API requests
    base_url = "https://svc-prod.herohero.co/api/v2/posts/"
    headers = {
        "Cookie": cookie
    }

    # Process each post ID with a progress bar
    for post_id in tqdm(post_ids, desc="Processing Posts", unit="post"):
        try:
            # Make GET request
            response = requests.get(f"{base_url}{post_id}", headers=headers)
            response.raise_for_status()  # Raise an error for bad responses

            # Process the response JSON
            processed_data = extract_post_data(response.text)

            # Add incremental ID
            processed_data["id"] = next_id
            next_id += 1

            # Append to data
            data.append(processed_data)

        except requests.RequestException as e:
            print(f"\nFailed to fetch post ID {post_id}: {e}")
        except ValueError as e:
            print(f"\nFailed to process post ID {post_id}: {e}")

    # Save data to postsData.json
    with open(output_file, "w", encoding="utf-8") as data_file:
        json.dump(data, data_file, indent=4)

    print(f"\nProcessing complete. Data saved to {output_file}")


if __name__ == "__main__":
    # Example usage
    file_location = input("Enter the path to posts.json: ")
    user_id = input("Enter the HeroHero user ID: ")
    cookie = input("Enter your HeroHero session cookie: ")

    main(file_location, user_id, cookie)
