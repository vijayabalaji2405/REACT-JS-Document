import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
import { firebase } from "../../lib/firebase";
import "./comments.css";
import { FieldValue } from "../../lib/firebase";
import Actions from "./actions";
export default function Comments({
  docId,
  // comments,
  posted,
  commentInput,
  content,
  toggleLiked,
  setToggleLiked,
  likes,
  setLikes,
}) {
  const handleFocus = () => {
    commentInput.current.focus();
  };
  const [comments, setComments] = useState(content.comments);
  const [showing, setShowing] = useState(false);

  function Image({ src, caption }) {
    return (
      <div className="imgdiv">
        <img src={src} alt={caption} className="img" />
      </div>
    );
  }
  const addLikes = (index) => {
    let tempObj = [...comments];
    if (tempObj[index]["likes"]) {
      tempObj[index]["likes"] = false;
    } else {
      tempObj[index]["likes"] = true;
    }
    firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({ comments: tempObj });
    setComments(tempObj);
  };

  function Comment({ showing, setShowing }) {
    return (
      <>
        {!showing ? (
          <>
            {comments.slice(0, 3).map((item, index) => (
              <p key={index} className="mb-1">
                <Link to={`/p/${item.displayName}`}>
                  <span className="mr-1 font-bold">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </p>
            ))}
          </>
        ) : (
          <>
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
              <div className="model-overlay modal-overlay fixed w-full h-full overflow-y-scroll bg-gray-100 left-0 right-0 opacity-50 -z-10"></div>
              <div className="modal-container bg-white w-1/2 mx-auto rounded shadow-lg overflow-y-auto z-10">
                <div className="modal-content text-left">
                  <div
                    className="x absolute close-icon"
                    onClick={() => {
                      setShowing(!showing);
                    }}
                  >
                    ❌
                  </div>
                  <div className="wrapper flex">
                    <div className="image w-1/2">
                      <Image src={content.imageSrc} caption={content.caption} />
                    </div>
                    <div className="right w-1/2 pl-2">
                      <div className="head pt-4  ">
                        <img
                          className="rounded-full w-10 flex mr-3 imgclass"
                          src={`/images/avatars/${content.username}.jpg`}
                        />
                        <span className="font">{content.username}</span>
                      </div>
                      <div className="sidecomment mt-5">
                        {comments.map((item, index) => (
                          <div
                            key={index}
                            className="mb-1 classes flex pb-6 justify-between"
                          >
                            <div className="wrap flex">
                              <Link to={`/p/${item.displayName}`}>
                                <img
                                  className="rounded-full w-8 flex mr-3 imgclass "
                                  src={`/images/avatars/${item.displayName}.jpg`}
                                  alt={`Follow ${item.displayName}`}
                                />
                              </Link>
                              <Link to={`/p/${item.displayName}`}>
                                <span className="name pl-1">
                                  {item.displayName}:
                                </span>
                              </Link>
                              <span className="comm pr-5">{item.comment}</span>
                            </div>
                            <div>
                              <svg
                                onClick={() => addLikes(index)}
                                className={`w-8 mr-4 select-none cursor-pointer ${
                                  item.likes
                                    ? "fill-current text-red-500"
                                    : "text-black"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                tabIndex={index}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* <Likes /> */}
                      <Actions
                        docId={content.docId}
                        totalLikes={content.likes.length}
                        toggleLiked={toggleLiked}
                        handleFocus={handleFocus}
                        setToggleLiked={setToggleLiked}
                        setLikes={setLikes}
                        likes={likes}
                      />

                      <AddComment
                        docId={docId}
                        comments={comments}
                        setComments={setComments}
                        commentInput={commentInput}
                      />
                      {/* <div className="input">
                        <input type="text" placeholder="Add your comment" />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <Comment showing={showing} setShowing={setShowing} />
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
