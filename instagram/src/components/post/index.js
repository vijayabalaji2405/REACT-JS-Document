// import React, { useRef } from "react";

// import Header from "./header";
// import Image from "./image";
// import Actions from "./actions";
// import Footer from "./footer";
// import Comments from "./comments";
// // import Dashboard from "../../pages/dashboard";
// // import { DASHBOARD } from "../../constants/routes";

// export default function Post({ content }) {
//   // <Dashboard content={content} />;
//   const commentInput = useRef(null);
//   const handleFocus = () => {
//     commentInput.current.focus();
//   };

//   return (
//     <div className="rounded col-span-4 border bg-white mb-16">
//       <Header username={content.username} />
//       <Image src={content.imageSrc} caption={content.caption} />
//       <Actions
//         docId={content.docId}
//         totalLikes={content.likes.length}
//         likedPhoto={content.userLikedPhoto}
//         handleFocus={handleFocus}
//       />
//       <Footer username={content.username} caption={content.caption} />
//       <Comments
//         docId={content.docId}
//         comments={content.comments}
//         posted={content.dateCreated}
//         commentInput={commentInput}
//         // content={content}
//       />
//     </div>
//   );
// }
import React, { useState, useRef } from "react";

import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import { Modal } from "./comments";
export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();
  };
  const [toggleLiked, setToggleLiked] = useState(content.userLikedPhoto);

  const [likes, setLikes] = useState(content.likes.length);
  // <Modal content={content} />;

  return (
    <div className="rounded col-span-4 border bg-white mb-16">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        likes={likes}
        toggleLiked={toggleLiked}
        setLikes={setLikes}
        handleFocus={handleFocus}
        content={content}
        setToggleLiked={setToggleLiked}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        posted={content.dateCreated}
        commentInput={commentInput}
        content={content}
        toggleLiked={toggleLiked}
        setToggleLiked={setToggleLiked}
        setLikes={setLikes}
        likes={likes}
      />
    </div>
  );
}
