import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { Body } from './style';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_USER_REQUEST } from '../../reducers/user';

const Profile = () => {
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  return (
    <Body>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <button className="btn" title="프로필 사진 바꾸기">
                {userInfo.Image ? (
                  <img src={userInfo.Image} alt="프로필 사진 바꾸기" />
                ) : (
                  <Avatar
                    size={150}
                    style={{
                      fontSize: '7rem',
                    }}
                  >
                    {userInfo.nickname[0]}
                  </Avatar>
                )}
              </button>
            </div>
            <div className="profile-user-settings">
              <h3 className="profile-user-name">{userInfo.nickname}</h3>
              <button className="btn profile-edit-btn">프로필 편집</button>
              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  게시물{' '}
                  <span className="profile-stat-count">{userInfo.Posts}</span>
                </li>
                <li className="li-pointer">
                  팔로워{' '}
                  <span className="profile-stat-count">
                    {userInfo.Followers}
                  </span>
                </li>
                <li className="li-pointer">
                  팔로우{' '}
                  <span className="profile-stat-count">
                    {userInfo.Followings}
                  </span>
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Jane Doe</span> Lorem ipsum
                dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="gallery">
            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 56
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 2
                  </li>
                </ul>
              </div>
            </div>
            <div className="gallery-item" tabIndex="0">
              <img
                src="http://localhost:3060/IU1583398409235.png"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 56
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 2
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 89
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 5
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 42
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 42
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Video</span>
                <i className="fas fa-video" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 38
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 0
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 47
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 94
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 3
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://cdn.pixabay.com/photo/2020/02/07/14/15/landscape-4827278__340.jpg"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 52
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 4
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 66
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 2
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 45
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 0
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 34
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 41
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 0
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
                className="gallery-image"
                alt=""
              />

              <div className="gallery-item-type">
                <span className="visually-hidden">Video</span>
                <i className="fas fa-video" aria-hidden="true"></i>
              </div>

              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <FontAwesomeIcon icon={faHeart} /> 30
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <FontAwesomeIcon icon={faComment} flip="horizontal" /> 2
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="loader"></div>
        </div>
      </main>
    </Body>
  );
};

Profile.getInitialProps = async context => {
  const nickname = context.query.nickname;
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: nickname,
  });
  // context.store.dispatch({
  //   type: LOAD_USER_POSTS_REQUEST,
  //   data: id,
  // });
  return { nickname };
};

export default Profile;
