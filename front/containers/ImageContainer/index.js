import React, { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

import { ImgContainer, Image } from './style';

const ImageContainer = memo(({ post, location }) => {
  const { Likers, Images, Comments } = post;
  const [hover, setHover] = useState(false);
  const hoverOn = useCallback(() => {
    setHover(true);
  }, [hover]);
  const hoverOff = useCallback(() => {
    setHover(false);
  }, [hover]);
  const LikeCount = Likers.length.toLocaleString();
  const CommentCount = Comments.length.toLocaleString();

  return (
    <ImgContainer>
      <div className="QzzMf" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        <Link
          href={{
            pathname: '/p',
            query: { id: post.id, nickname: location },
          }}
          as={`/p/${post.id}`}
        >
          <a>
            <div className="imgbackgroud">
              <div className="KL4Bh">
                <Image
                  src={Images[0].src.replace(/original\//, 'thumb/')}
                  alt={Images[0].src.replace(/original\//, 'thumb/')}
                  hover={hover}
                />
              </div>
              <div className="_9AhH0"></div>
            </div>
            {post.Images.length !== 1 && (
              <div className="BcNgP">
                <svg
                  className="edmGD"
                  fill="#ffffff"
                  height="28"
                  viewBox="0 0 48 48"
                  width="28"
                >
                  <path d="M 34.8 29.7 V 11 c 0 -2.9 -2.3 -5.2 -5.2 -5.2 H 11 c -2.9 0 -5.2 2.3 -5.2 5.2 v 18.7 c 0 2.9 2.3 5.2 5.2 5.2 h 18.7 c 2.8 -0.1 5.1 -2.4 5.1 -5.2 Z M 39.2 15 v 16.1 c 0 4.5 -3.7 8.2 -8.2 8.2 H 14.9 c -0.6 0 -0.9 0.7 -0.5 1.1 c 1 1.1 2.4 1.8 4.1 1.8 h 13.4 c 5.7 0 10.3 -4.6 10.3 -10.3 V 18.5 c 0 -1.6 -0.7 -3.1 -1.8 -4.1 c -0.5 -0.4 -1.2 0 -1.2 0.6 Z"></path>
                </svg>
              </div>
            )}
            {hover && (
              <div className="hoverContainer">
                <ul>
                  <li className="item-likes">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      style={{ marginRight: '7px' }}
                    />
                    <span>{LikeCount}</span>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faComment}
                      flip="horizontal"
                      size="lg"
                      style={{ marginRight: '7px' }}
                    />
                    <span>{CommentCount}</span>
                  </li>
                </ul>
              </div>
            )}
          </a>
        </Link>
      </div>
    </ImgContainer>
  );
});

export default ImageContainer;
