// code from sipc
import axios from "axios";
const { detectOne } = require("langdetect");

export async function autodetect(content: string): Promise<string> {
  try {
    let data = JSON.stringify({"text": content})
    const langResponse = await axios.post(`https://api.translatedlabs.com/language-identifier/identify`,data);
    const detectedLang = langResponse.data.code.substring(0, 2).toLowerCase();
    return detectedLang;
  } catch (axiosError) {
    console.error("Axios Error:", axiosError);
    try {
      const detectedLang = detectOne(content);
      return detectionMap[detectedLang] || detectedLang || "auto";
    } catch (langdetectError) {
      console.error("Langdetect Error:", langdetectError);
      return "auto";
    }
  }
}
