// const singleVideo = document.getElementById("videotest");
const multiVideos = document.querySelectorAll(".custom_video");

// multiVideos.forEach((multiVideo) => {});

// for (const multiVideo of multiVideos) {
//   //   multiVideo.muted = true;

//   multiVideo.autoplay = true;
// }
// singleVideo.controlsList = "nofullscreen nodownload noplay";

// console.log(singleVideo.controlsList.value);

// singleVideo.defaultMuted = true;
let numberOfVideo = 0;
const phoneTouch = "ontouchstart" in window;
let isClicked = false;

for (const [index, multiVideo] of multiVideos.entries()) {
  // e.preventDefault();
  multiVideo.controls = true;
  multiVideo.controlsList = "nodownload nofullscreen";
  multiVideo.playbackRate = 1;
  const tracks = multiVideo.textTracks;

  if (!phoneTouch) {
    multiVideo.addEventListener("mouseleave", (e) => {
      if (!isClicked) {
        multiVideo.pause();
      }
    });

    multiVideo.addEventListener("mouseenter", (e) => {
      e.preventDefault();

      multiVideo.muted = true;
      multiVideo.play();

      multiVideo.volume = 0.1;

      // }
    });
  }

  multiVideo.addEventListener("click", (e) => {
    isClicked = true;

    if (multiVideo.paused) {
      multiVideo.play();
    } else {
      multiVideo.pause();
    }
  });

  for (const track of tracks) {
    track.mode = "showing";
  }

  multiVideo.addEventListener("durationchange", (e) => {
    console.log("changes");
  });
}
