import { useRecoilValue } from "recoil";
import { userState } from "../Utils/atoms";

function Inbox() {
  const userId = useRecoilValue(userState);

  console.log("User ID", userId);

  return (
    <>
      <h1>
        {" "}
        This page allows users of the app to send and receive messages, and
        displays the conversation between them.
        {/* Or, more concisely: This page
        handles and displays the app's messaging feature.{" "} */}
      </h1>
    </>
  );
}

export default Inbox;
