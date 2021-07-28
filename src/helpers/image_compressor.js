import { getFileType } from "./dateconv";
import Compressor from "compressorjs";
async function imageCompressor(
  inputFiles,
  setFiles,
  unCompressedFile,
  { quality = 0.6 } = {}
) {
  let compressedFiles = [];
  let unCompressedFiles = [];

  for (let i = 0; i < inputFiles.length; i++) {
    let k = Number(i);
    if (getFileType(inputFiles[k]) === "img") {
      new Compressor(inputFiles[k], {
        quality: quality,
        success(result) {
          compressedFiles.push(result);
          setFiles(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      //write video compressing tool here

      unCompressedFiles.push(inputFiles[k]);
      console.log("file not compressed");
      unCompressedFile(inputFiles[k]);
    }
  }
  //   return { compressedFiles, unCompressedFiles };
}
export { imageCompressor };
