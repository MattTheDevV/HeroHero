import requests

def getProfilePosts(profile_id, cookie):
    """
    Fetches all post IDs for a given profile ID using pagination.
    
    Args:
        profile_id (str): The profile ID to fetch posts for.
        cookie (str): The authentication cookie for the request.
        
    Returns:
        list: An array of post IDs.
    """
    url = "https://svc-prod.herohero.co/graphql/"
    headers = {
        "Content-Type": "application/json",
        "Cookie": cookie
    }
    
    after_post = None
    post_ids = []

    while True:
        # GraphQL query
        query = {
            "query": """
            query GetProfilePosts($userId: ID!, $afterPost: String, $postFilter: PostFilter) {
              posts(id: $userId, after: $afterPost, filter: $postFilter) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  id
                }
              }
            }
            """,
            "variables": {
                "userId": profile_id,
                "afterPost": after_post,
                "postFilter": None
            },
            "operationName": "GetProfilePosts"
        }

        # Make the POST request
        response = requests.post(url, headers=headers, json=query)
        response_data = response.json()

        # Extract post IDs and pagination info
        page_info = response_data["data"]["posts"]["pageInfo"]
        post_ids.extend([post["id"] for post in response_data["data"]["posts"]["nodes"]])

        # Check if there are more pages
        if not page_info["hasNextPage"]:
            break

        # Update afterPost for the next request
        after_post = page_info["endCursor"]

    return post_ids
