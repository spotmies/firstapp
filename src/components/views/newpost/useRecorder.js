import { useEffect, useState } from "react";

const useRecorder = (inputRecordTime) => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  var autoStopMillis = inputRecordTime ?? 30000;
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, (error) => {
          if (error) {
            console.log(error);
            alert(`Something went wrong ${error}`);
            setIsRecording(false);
          }
        });
      }
      return;
    } else {
      // Manage recorder state.

      if (isRecording) {
        try {
          recorder.start();
        } catch (error) {
          console.log(error);
          alert("Something went wrong.. Refress");
          setIsRecording(false);
        }
      } else {
        try {
          recorder.stop();
        } catch (error) {
          console.log(error);
          alert("Something went wrong.. Refress");
          setIsRecording(false);
        }
      }
    }
    // Obtain the audio when ready.
    const handleData = (e) => {
      console.log(e);
      let auidio = e.data;
      auidio["name"] = Math.floor(e.timecode).toString();
      setAudioURL(auidio);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      console.log("autoStop audio>>>");
      stopRecording();
    }, autoStopMillis);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  console.log(stream);
  return new MediaRecorder(stream);
}
export default useRecorder;
