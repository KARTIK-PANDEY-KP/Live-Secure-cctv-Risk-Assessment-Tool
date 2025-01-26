import os
import time
# Install the Twelve Labs SDK
# !pip3 install twelvelabs
# !pip install ffmpeg-python
# !pip install pandas

import os
from twelvelabs import TwelveLabs
from twelvelabs.models.task import Task
import pandas as pd
import ffmpeg
import hashlib
import re
from pathlib import Path
import csv
import shutil
from dotenv import load_dotenv

import asyncio
from seclo_bot import send_telegram_message

load_dotenv()


API_KEY = "tlk_0QGAQCF0RSEGVT2GZTM1F1RJJ887"
INDEX_NAME = "twitch_test"
# VIDEO_PATH = "Sequence_08.mp4"  # Path to the video file
# VIDEO_PATH = "NA.mp4"  # Path to the video file

# Define the search query
QUERY_TEXT = "a boy in green shirt drinking water from a bottle"

def generate_data(VIDEO_PATH, QUERY_TEXT,INDEX_NAME=INDEX_NAME, VIDEO_UPLOAD = 0, DELETE = True, API_KEY=API_KEY, TOPK = 5):
    if DELETE:  
        if os.path.exists("output"):
            shutil.rmtree("output")
            print(f"'{"output"}' has been removed.")
        else:
            print(f"'{"output"}' does not exist.")
        os.mkdir("output")
    
    # Initialize the client with your API key
    client = TwelveLabs(api_key=API_KEY)
    
    # index access
    
    # Step 1: Search for the existing index by name
    found_index = None
    try:
        search_results = client.index.list()  # Fetch the list of indexes
    except Exception as e:
        print(f"Error retrieving indexes: {e}")
        search_results = []  # Ensure search_results is defined, even if retrieval fails
    
    for idx in search_results.root:  # Assuming search_results contains the list of indexes
        if idx.name == INDEX_NAME:
            found_index = idx
            break
    
    # Step 2: If the index exists, store its ID
    if found_index:
        print(f"Index already exists: id={found_index.id}, name={found_index.name}")
        index_id = found_index.id
    
    # Step 3: If the index does not exist, create a new one
    else:
        print(f"Index with name '{INDEX_NAME}' not found. Creating a new index...")
    
        try:
            index = client.index.create(
                name=INDEX_NAME,  # Use the desired name for the index
                models=[
                    {
                        "name": "marengo2.7",  # Engine for video understanding
                        "options": ["visual", "audio"],  # Options for visual, conversation, and text
                    }
                ],
                addons=["thumbnail"],  # Optional thumbnail addon
            )
            print(f"Created new index: id={index.id} name={index.name}")
            index_id = index.id  # Store the new index ID
    
        except Exception as e:
            print(f"Error during index creation: {e}")
    
    # Now you have the index ID stored in `index_id`, whether it was found or created
    print(f"Using index ID: {index_id}")
    
    
    # Step 2: Upload the video
    
    if VIDEO_UPLOAD:
        try:
            print(f"Uploading {VIDEO_PATH}") 
            task = client.task.create(index_id=index_id, file=VIDEO_PATH, language="en")  # Upload the video
            print(f"Created task: id={task.id}")
            
            # Monitor the upload and indexing process
            def on_task_update(task: Task):
                print(f"  Status={task.status}")
        
            task.wait_for_done(sleep_interval=50, callback=on_task_update)  # Wait until the task is done
            
            if task.status != "ready":
                raise RuntimeError(f"Indexing failed with status {task.status}")
            
            print(f"Uploaded {VIDEO_PATH}. The unique identifier of your video is {task.video_id}.")
            
        except Exception as e:
            print(f"Error during video upload or processing: {e}")
    
    # HELPER
    
    def normalize_query(query):
        # Remove special characters and convert text to lowercase
        return re.sub(r'\W+', '', query.lower())
    
    def get_folder_name_from_query(query, folder_base=""):
        # Normalize the query
        normalized_query = normalize_query(query)
        
        # Create a hash from the normalized query
        hash_object = hashlib.md5(normalized_query.encode())  # Using MD5 hash (you can also use SHA256)
        folder_hash = hash_object.hexdigest()[:8]  # Using first 8 characters of the hash
    
        # Construct folder path using the folder base and hash
        folder_path = Path(folder_base) / folder_hash
        return folder_path, folder_hash
    
    def map_query_to_csv(query, folder_path, csv_file="output/query_mapping.csv"):
        # Write the query and folder path to the CSV file
        with open(csv_file, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([query, folder_path])
        print("done")
    
    FOLDER_NAME, FOLDER_HASH = get_folder_name_from_query(QUERY_TEXT)
    map_query_to_csv(QUERY_TEXT, FOLDER_NAME, csv_file="output/query_mapping.csv")
    if not os.path.exists(Path("output") / FOLDER_NAME):
        os.makedirs(Path("output") / FOLDER_NAME)
    # List to hold all results
    results = []
    
    try:    
        # Step 1: Perform the search
        search_results = client.search.query(
            index_id=index_id, 
            query_text=QUERY_TEXT,  # Search term (e.g., 'knockout')
            options=["visual", "audio"]  # Search options for visual and conversation
        )
        if not search_results.data:
            print("No results found for the query.")
            return False  # Exit early if no results are found
        idx = 0
        # Step 2: Process each page of results
        def collect_results(page, idx):
            i = 0
            for clip in page:
                # Append each result to the list as a dictionary
                results.append({
                    'index_clip': str(FOLDER_NAME) + "_" + str(idx)+ "_" + str(i),
                    'video_id': clip.video_id,
                    'score': clip.score,
                    'start': clip.start,
                    'end': clip.end,
                    'confidence': clip.confidence,
                    'thumbnail_url': clip.thumbnail_url
                })
                i += 1
    
        # Step 3: Collect the results from the first page
        collect_results(search_results.data, idx)
        idx += 1
        
        # Step 4: Handle pagination
        while True:
            try:
                collect_results(next(search_results), idx)  # Get the next page of results
                idx += 1
            except StopIteration:
                break  # Exit loop when there are no more pages
    
        # Step 5: Convert the results to a pandas DataFrame
        df = pd.DataFrame(results)
        
        # Step 6: Save the DataFrame to a CSV file
        df.to_csv(f"output/{FOLDER_NAME}/search_results.csv", index=False)
        print(f"Results have been saved to output/{FOLDER_NAME}/search_results.csv")
    
    except Exception as e:
        print(f"Error during search: {e}")
    
    
    
    # Load the CSV file
    csv_file = f"output/{FOLDER_NAME}/search_results.csv"  # Replace with the path to your CSV file
    data = pd.read_csv(csv_file)
    data['score'] = pd.to_numeric(data['score'], errors='coerce')

    # Filter out NaN values if necessary
    data = data.dropna(subset=['score'])


    if (data['score'] > 75).any():
        print(True)
        return True
    else:
        print(False)
        return False



    
    # # Define the input video file path (constant for all clips)
    # input_video = VIDEO_PATH # Replace with your video file path
    
    # # Loop through the CSV rows and extract clips
    # for index, row in data.iterrows():
    #     index_clip = row['index_clip']  # Use index_clip from the CSV
    #     start_time = row['start']
    #     end_time = row['end']
        
    #     # Dynamic output file name using index_clip from the CSV
    #     output_clip = f"output/{FOLDER_NAME}/{index_clip}.mp4"
    
    #     # Use FFmpeg to extract the subclip
    #     try:
    #         ffmpeg.input(VIDEO_PATH, ss=start_time, t=end_time - start_time).output(output_clip).run()
    #         print(f"Clip saved to {output_clip}")
    #     except ffmpeg.Error as e:
    #         print(f"Error processing clip {index}: {e}")

    return FOLDER_HASH
# generate_data(API_KEY, INDEX_NAME, VIDEO_PATH, QUERY_TEXT, 1, 0, 5)

async def process_previous_clip(previous_clip):
    """Custom function to process the previous clip asynchronously."""
    print(f"[PROCESSING] Previous clip: {previous_clip}")

    # Send a Telegram message
    try:
        await send_telegram_message(f"[PROCESSING] Previous clip: {previous_clip}")
    except Exception as e:
        print(f"Failed to send message: {e}")

    QUERY_TEXT = "a boy in green shirt drinking water from a bottle"
    ret = generate_data(
        API_KEY=API_KEY,
        INDEX_NAME="nsec4",
        VIDEO_PATH=f"clips/{previous_clip}",
        QUERY_TEXT=QUERY_TEXT,
        DELETE=1,
        VIDEO_UPLOAD=1,
        TOPK=5,
    )

    if ret:
        try:
            await send_telegram_message("a boy in green shirt drinking water from a bottle!!")
        except Exception as e:
            print(f"Failed to send message: {e}")


async def monitor_clips(output_folder="clips"):
    """Asynchronous function to monitor the output folder for new clips."""
    if not os.path.exists(output_folder):
        print(f"[ERROR] Folder '{output_folder}' does not exist.")
        return

    existing_clips = set(os.listdir(output_folder))
    previous_clip = None
    print("[INFO] Monitoring for new clips...")

    try:
        while True:
            await asyncio.sleep(2)  # Asynchronous sleep
            current_clips = set(os.listdir(output_folder))
            new_clips = current_clips - existing_clips

            for clip in sorted(new_clips):
                if previous_clip:
                    await process_previous_clip(previous_clip)  # Await the async function
                previous_clip = clip
            existing_clips = current_clips
    except KeyboardInterrupt:
        print("[INFO] Stopped monitoring.")


if __name__ == "__main__":
    asyncio.run(monitor_clips())