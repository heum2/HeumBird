const AWS = require("aws-sdk");
const Sharp = require("sharp");

const S3 = new AWS.S3({ region: "ap-northeast-2" });

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURI(event.Records[0].s3.object.key);
  console.log("키 값 확인 :", Key);
  const filename = Key.split("/")[Key.split("/").length - 1];
  const ext = Key.split(".")[Key.split(".").length - 1];
  console.log(Bucket, Key, filename, ext);

  let requiredFormat;
  if (ext === "jpg") {
    requiredFormat = "jpeg";
  } else if (ext === "gif") {
    requiredFormat = "png";
  } else {
    requiredFormat = ext;
  }
  console.log("현재 확장자 확인 :", requiredFormat);

  try {
    const s3Object = await S3.getObject({
      Bucket,
      Key
    }).promise();
    console.log("original ", s3Object.Body.length);
    const resizedImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: "inside"
      })
      .toFormat(requiredFormat)
      .toBuffer();
    console.log("resize ", resizedImage.length);
    await S3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage
    }).promise();
    console.log("put");
    return callback(null, `thumb/${filename}`); // 1번째 인자, 실패, 2번째 인자 성공
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};
