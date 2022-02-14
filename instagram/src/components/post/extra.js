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
//   console.log(allComments);
//   // const [comments, setComments] = useState(allComments);
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
//////actions
// import React, { useState, useContext } from "react";
// import FirebaseContext from "../../context/firebase";
// import UserContext from "../../context/user";

// export default function Actions({
//   docId,
//   totalLikes,
//   likedPhoto,
//   handleFocus,
// }) {
//   const {
//     user: { uid: userId = "" },
//   } = useContext(UserContext);
//   const [toggleLiked, setToggleLiked] = useState(likedPhoto);
//   const [likes, setLikes] = useState(totalLikes);
//   const { firebase, FieldValue } = useContext(FirebaseContext);

//   const handleToggleLiked = async () => {
//     setToggleLiked((toggleLiked) => !toggleLiked);

//     await firebase
//       .firestore()
//       .collection("photos")
//       .doc(docId)
//       .update({
//         likes: toggleLiked
//           ? FieldValue.arrayRemove(userId)
//           : FieldValue.arrayUnion(userId),
//       });

//     setLikes((likes) => (toggleLiked ? likes + 1 : likes - 1));
//   };

//   return (
//     <>
//       <div className="flex justify-between p-4">
//         <div className="flex">
//           <svg
//             onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleToggleLiked((toggleLiked) => !toggleLiked);
//               }
//             }}
//             className={`w-8 mr-4 select-none cursor-pointer ${
//               toggleLiked ? "fill-current text-red-500" : "text-black"
//             }`}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             tabIndex={0}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             />
//           </svg>
//           <svg
//             onClick={handleFocus}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleFocus();
//               }
//             }}
//             className="w-8 text-black-light select-none cursor-pointer"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             tabIndex={0}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="p-4 py-0">
//         <p className="font-bold">
//           {likes === 1 ? `${likes} like` : `${likes} likes`}
//         </p>
//       </div>
//     </>
//   );
// }

// import React, { useState, useContext, useEffect } from "react";
// import FirebaseContext from "../../context/firebase";
// import UserContext from "../../context/user";

// export default function Actions({
//   docId,
//   totalLikes,
//   likedPhoto,
//   handleFocus,
//   content,
// }) {
//   const {
//     user: { uid: userId = "" },
//   } = useContext(UserContext);
//   const [toggleLiked, setToggleLiked] = useState(content.isliked);
//   const [likes, setLikes] = useState(content.likes.length);
//   console.log(content.likes.length);
//   useEffect(() => {
//     setLikes(0);
//   }, [content.likes.length === 0]);
//   const { firebase, FieldValue } = useContext(FirebaseContext);

//   const handleToggleLiked = async () => {
//     setToggleLiked((toggleLiked) => !toggleLiked);

//     await firebase
//       .firestore()
//       .collection("photos")
//       .doc(docId)
//       .update({
//         likes: toggleLiked
//           ? FieldValue.arrayRemove(userId)
//           : FieldValue.arrayUnion(userId),
//       });
//     await firebase.firestore().collection("photos").doc(docId).update({
//       isliked: !toggleLiked,
//     });
//     setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
//   };

//   return (
//     <>
//       <div className="flex justify-between p-4">
//         <div className="flex">
//           <svg
//             onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleToggleLiked((toggleLiked) => !toggleLiked);
//               }
//             }}
//             className={`w-8 mr-4 select-none cursor-pointer ${
//               toggleLiked ? "fill-current text-red-500" : "text-black"
//             }`}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             tabIndex={0}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             />
//           </svg>
//           <svg
//             onClick={handleFocus}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleFocus();
//               }
//             }}
//             className="w-8 text-black-light select-none cursor-pointer"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             tabIndex={0}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="p-4 py-0">
//         <p className="font-bold">
//           {likes === 1 ? `${likes} like` : `${likes} likes`}
//         </p>
//       </div>
//     </>
//   );
// }
