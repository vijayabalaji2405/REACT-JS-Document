// import React, { useState } from "react";
// import { formatDistance } from "date-fns";
// import { Link } from "react-router-dom";
// import AddComment from "./add-comment";

// export default function Comments({
//   docId,
//   comments: allComments,
//   posted,
//   commentInput,
// }) {
//   const [comments, setComments] = useState(allComments);

//   return (
//     <>
//       <div className="p-4 pt-1 pb-4">
//         {comments.length >= 3 && (
//           <p className="text-sm text-gray-500 mb-1 cursor-pointer">
//             View all {comments.length} comments
//           </p>
//         )}
//         {comments.slice(0, 3).map((item) => (
//           <p key={`${item.comment}-${item.displayName}`} className="mb-1">
//             <Link to={`/p/${item.displayName}`}>
//               <span className="mr-1 font-bold">{item.displayName}</span>
//             </Link>
//             <span>{item.comment}</span>
//           </p>
//         ))}
//         <p className="text-gray uppercase text-xs mt-2">
//           {formatDistance(posted, new Date())} ago
//         </p>
//       </div>
//       <AddComment
//         docId={docId}
//         comments={comments}
//         setComments={setComments}
//         commentInput={commentInput}
//       />
//     </>
//   );
// }

// import React, { useState } from "react";
// import { formatDistance } from "date-fns";
// import { Link } from "react-router-dom";
// import AddComment from "./add-comment";

// export default function Comments({
//   docId,
//   comments: allComments,
//   posted,
//   commentInput,
// }) {
//   const [comments, setComments] = useState(allComments);
//   const [showing, setShowing] = useState(false);
//   function Comment({ showing }) {
//     return (
//       <>
//         {!showing ? (
//           <>
//             {comments.slice(0, 3).map((item) => (
//               <p key={`${item.comment}-${item.displayName}`} className="mb-1">
//                 <Link to={`/p/${item.displayName}`}>
//                   <span className="mr-1 font-bold">{item.displayName}</span>
//                 </Link>
//                 <span>{item.comment}</span>
//               </p>
//             ))}
//           </>
//         ) : (
//           <>
//             {comments.map((item) => (
//               <p key={`${item.comment}-${item.displayName}`} className="mb-1">
//                 <Link to={`/p/${item.displayName}`}>
//                   <span className="mr-1 font-bold">{item.displayName}</span>
//                 </Link>
//                 <span>{item.comment}</span>
//               </p>
//             ))}
//           </>
//         )}
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="p-4 pt-1 pb-4">
//         {comments.length >= 3 && (
//           <p
//             className="text-sm text-gray-500 mb-1 cursor-pointer"
//             onClick={() => {
//               setShowing(!showing);
//             }}
//           >
//             View all {comments.length} comments
//           </p>
//         )}
//         <Comment showing={showing} />

//         <p className="text-gray uppercase text-xs mt-2">
//           {formatDistance(posted, new Date())} ago
//         </p>
//       </div>
//       <AddComment
//         docId={docId}
//         comments={comments}
//         setComments={setComments}
//         commentInput={commentInput}
//       />
//     </>
//   );
// }
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
import { Comment } from "../profile/header";
import "./comments.css";
export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  content,
}) {
  const [comments, setComments] = useState(allComments);
  const [showing, setShowing] = useState(false);

  function Image({ src, caption }) {
    return (
      <div className="imgdiv">
        <img src={src} alt={caption} className="img" />
      </div>
    );
  }
  function Comment({ showing }) {
    const [showing1, setshowing1] = useState(showing);
    return (
      <>
        {!showing1 ? (
          <>
            {comments.slice(0, 3).map((item) => (
              <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                <Link to={`/p/${item.displayName}`}>
                  <span className="mr-1 font-bold">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </p>
            ))}
          </>
        ) : (
          <>
            <div className="modal">
              {/* <div className="modal-overlay fixed w-full h-full overflow-y-scroll bg-gray-900 left-0 right-0 opacity-50 -z-10"></div> */}
              {/* <div className="sidecomment"> */}
              <div className="image">
                <Image src={content.imageSrc} caption={content.caption} />
              </div>
              <div
                className="x"
                onClick={() => {
                  setShowing(!showing);
                }}
              >
                ❌
              </div>
              <div className="head">Comments :</div>
              <div className="sidecomment">
                {comments.map((item) => (
                  <div
                    key={`${item.comment}-${item.displayName}`}
                    className="mb-1 classes"
                  >
                    <Link to={`/p/${item.displayName}`}>
                      <img
                        className="rounded-full w-8 flex mr-3 imgclass"
                        src={`/images/avatars/${item.displayName}.jpg`}
                        alt={`Follow ${item.displayName}`}
                      />
                    </Link>
                    <Link to={`/p/${item.displayName}`}>
                      <span className="name">{item.displayName}:</span>
                    </Link>
                    <span className="comm">{item.comment}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* </div> */}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p
            className="text-sm text-gray-500 mb-1 cursor-pointer"
            onClick={() => {
              setShowing(!showing);
            }}
          >
            View all {comments.length} comments
          </p>
        )}
        <Comment showing={showing} />;
        <p className="text-gray uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

{
  /* <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
              <div className="modal-overlay fixed w-full h-full overflow-y-scroll bg-gray-900 left-0 right-0 opacity-50 -z-10"></div>
              <div className="modal-container bg-white w-full md:w-1/2 mx-auto rounded shadow-lg overflow-y-auto">
                <div className="image">
                  <Image src={content.imageSrc} caption={content.caption} />
                </div>
                <div
                  className="x"
                  onClick={() => {
                    setShowing(!showing);
                  }}
                >
                  ❌
                </div>
                <div className="head">Comments :</div>
                <div className="sidecomment">
                  {comments.map((item) => (
                    <div
                      key={`${item.comment}-${item.displayName}`}
                      className="mb-1 classes"
                    >
                      <Link to={`/p/${item.displayName}`}>
                        <img
                          className="rounded-full w-8 flex mr-3 imgclass"
                          src={`/images/avatars/${item.displayName}.jpg`}
                          alt={`Follow ${item.displayName}`}
                        />
                      </Link>
                      <Link to={`/p/${item.displayName}`}>
                        <span className="name">{item.displayName}:</span>
                      </Link>
                      <span className="comm">{item.comment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div> */
}
