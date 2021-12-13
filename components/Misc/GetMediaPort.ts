import { MediaPort } from "../../enums";

const GetMediaPort = (size: ScreenSize): MediaPort | undefined => {
  if (size.height != null && size.width != null) {
    // if (size.width > 1007) return MediaPort.xtremeDesktop;
    if (size.width > 640) return MediaPort.desktop;
    if (size.width <= 640) return MediaPort.mobile;

    return MediaPort.mobile;
  }
}
export default GetMediaPort;