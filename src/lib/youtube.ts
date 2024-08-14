import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript"

// implementando la api de youtube
export async function searchYoutube(searchQuery: string) {
    searchQuery = encodeURIComponent(searchQuery);
    const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_ACCESS_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
    );
        console.log(data)
    if (!data) {
        console.log("fallo youtube")
        return null
    }
    if (data.items[0] == undefined) {
        console.log("fallo youtube")
        return null
    }

    return data.items[0].id.videoId
}

export async function getTranscript(videoId: string){
    console.log(videoId, "desde youtube")
    try {
      const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: "es", 
      })
      console.log("Transcripción obtenida:", transcript_arr)
      if (transcript_arr.length === 0) {
        console.log("No hay transcripción disponible")
      } else {
        const transcript = transcript_arr.map((item) => item.text).join(' ');
        console.log("Transcripción:", transcript)
        return transcript.replace(/\n/g, '');
      }
    } catch (error) {
      console.error("Error:", error)
      return ''
    }
  }