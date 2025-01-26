import subprocess

def extract_hls_url(twitch_url):
    """Extract the HLS URL from the Twitch stream using yt-dlp."""
    command = ["yt-dlp", "-g", twitch_url]
    result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
    return result.stdout.strip()

def extract_clips(hls_url):
    """Use FFmpeg to extract 30-second clips from the HLS stream."""
    command = [
        "ffmpeg",
        "-i", hls_url,
        "-f", "segment",
        "-segment_time", "30",
        "-c", "copy",
        "-reset_timestamps", "1",
        "clips/clip_%03d.mp4"
    ]
    subprocess.run(command)

if __name__ == "__main__":
    twitch_url = "https://www.twitch.tv/kapiekpkp"
    
    print("[INFO] Extracting HLS URL...")
    hls_url = extract_hls_url(twitch_url)
    print(f"[INFO] HLS URL: {hls_url}")

    print("[INFO] Extracting 30-second clips...")
    extract_clips(hls_url)
    print("[INFO] Done!")
