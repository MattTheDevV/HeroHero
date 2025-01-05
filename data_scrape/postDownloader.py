import os
import json
from getProfilePosts import getProfilePosts
from jsonPostDataExtractor import main

if __name__ == "__main__":
    cookie = input("Please input your HeroHero access cookie: ")
    user_id = input("Please input username of HeroHero profile you want to download: ")

    # Fetch post IDs
    post_ids = getProfilePosts(user_id, cookie)

    # Create the directory if it doesn't exist
    output_dir = os.path.join("data", user_id)
    os.makedirs(output_dir, exist_ok=True)

    # Save to JSON file
    output_file = os.path.join(output_dir, "postIDs.json")
    with open(output_file, "w") as f:
        json.dump(post_ids, f, indent=2)

    print(f"PostIDS saved to {output_file}")

    main(output_file,user_id,cookie)


