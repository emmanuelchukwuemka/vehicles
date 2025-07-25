require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../../Models/dbConfig/db.Config");
const currentDate = require("../../util/Date/currentDate");
const date = currentDate();

const getAds = asyncHandler(async (req, res, next) => {
  const searchType = req.body.searchType;
  console.log(searchType);

  if (searchType === "home") {
    console.log("Home");

    const SQL = `SELECT * FROM realEstateProduct WHERE deleted = 0 AND drafted  = 0`;

    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(result);
      }
    });
  } else if (searchType === "bedBath") {
    const { bedRoomFilter, bathRoomFilter } = req.body;
    console.log("bedroom" + bedRoomFilter);
    console.log("bathroom" + bathRoomFilter);
    if ((bedRoomFilter === "undefined") & (bathRoomFilter === "undefined")) {
      const SQL = `SELECT * FROM realEstateProduct WHERE deleted = 0 AND drafted  = 0`;
      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201).send(result);
        }
      });
    } else if (
      (bedRoomFilter !== "undefined") &
      (bathRoomFilter === "undefined")
    ) {
      const SQL = `SELECT * FROM realEstateProduct WHERE bedRoom = ${bedRoomFilter} AND deleted = 0 AND drafted  = 0`;
      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201).send(result);
        }
      });
    } else if (
      (bedRoomFilter === "undefined") &
      (bathRoomFilter !== "undefined")
    ) {
      const SQL = `SELECT * FROM realEstateProduct WHERE  bathRoom = ${bathRoomFilter} AND deleted = 0 AND drafted  = 0`;
      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201).send(result);
        }
      });
    } else {
      const SQL = `SELECT * FROM realEstateProduct WHERE bedRoom = ${bathRoomFilter} AND bedRoom = ${bedRoomFilter} AND deleted = 0 AND drafted  = 0`;
      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.status(201).send(result);
        }
      });
    }
  } else if (searchType === "propertyType") {
    const { propertyTypeState } = req.body;
    console.log(propertyTypeState);
    const SQL = `SELECT * FROM realEstateProduct WHERE propertyType = \'${propertyTypeState}\' AND deleted = 0 AND drafted  = 0`;
    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(result);
      }
    });
  } else if (searchType === "price") {
    const { toPrice, fromPrice } = req.body;

    console.log(fromPrice);
    console.log(toPrice);

    const SQL = `SELECT * FROM realEstateProduct WHERE totalPrice BETWEEN \'${fromPrice}\' AND \'${toPrice}\' `;
    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        const data = result.filter(
          (data) => (data.deleted === 0) & (data.drafted === 0)
        );
        res.status(201).send(data);
      }
    });
  } else {
    const SQL = `SELECT * FROM realEstateProduct WHERE deleted = 0 AND drafted  = 0`;
    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(result);
      }
    });
  }
});

const getMyAds = asyncHandler(async (req, res, next) => {
  const userID = req.body.userID;
  const SQL = `SELECT * FROM realEstateProduct WHERE user_id = ${userID} AND deleted = 0`;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(result);
    }
  });
});

const deleteAdsPost = asyncHandler(async (req, res, next) => {
  const userID = req.body.id;
  const SQL = `UPDATE realEstateProduct  SET deleted = 1 WHERE id = ${userID}`;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(result);
    }
  });
});

const markAdsPost = asyncHandler(async (req, res, next) => {
  const postID = req.body.id;
  const status = req.body.status;
  if (status === "Active") {
    const SQL = `UPDATE realEstateProduct  SET status = \"sold\" WHERE id = ${postID}`;

    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).json({ status: "sold" });
      }
    });
  } else {
    const SQL = `UPDATE realEstateProduct  SET status = \"Active\" WHERE id = ${postID}`;

    db.query(SQL, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).json({ status: "Active" });
      }
    });
  }
});

const addToFavorite = asyncHandler(async (req, res, next) => {
  const propertyID = req.body.propertyID;
  const userID = req.body.userID;

  const SQL = `SELECT * FROM favoriteRealEstate WHERE property_id = ${propertyID} AND user_id =${userID}  `;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
      next();
    }
    if (result.length === 0) {
      const SQL = `INSERT INTO favoriteRealEstate(user_id,property_id,date)VALUES(?,?,?)`;
      db.query(SQL, [userID, propertyID, currentDate()], (err, result) => {
        if (err) {
          console.log(err);
          res.status(201).json({ message: err, status: 500 });
        } else {
          res.status(200).json({ message: "Successfully", status: 200 });
        }
      });
    } else {
      res.status(200).json({ message: "Successfully", status: 200 });
    }
  });
});

const getSellerDetails = asyncHandler(async (req, res, next) => {
  const seller_id = req.body.seller_id;

  const SQL = `SELECT * FROM shops WHERE user_id = ${seller_id}`;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
      next();
    }
    res.status(201).send(result);
  });
});

const createmessage = asyncHandler(async (req, res) => {
  const { userID, shopID, message, propertyID } = req.body;

  console.log(shopID);

  const SQL = `SELECT * from conversationsRealEstate WHERE sender_id = ${userID} AND receiver_id =${shopID} AND property_id = ${propertyID}  OR sender_id = ${shopID} AND receiver_id =${userID} AND property_id = ${propertyID} `;

  db.query(SQL, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (result.length === 0) {
      const SQL = `INSERT INTO conversationsRealEstate(sender_id,receiver_id,property_id,message,created_at,updated_at)VALUES(?,?,?,?,?,?)`;

      db.query(
        SQL,
        [userID, shopID, propertyID, message, date, date],
        (error, data) => {
          if (error) {
            console.error(error);
            return;
          }
          const SQL = `INSERT INTO messagesRealEstate (sender_id,receiver_id,message,creator_id,date,property_id)VALUES(?,?,?,?,?,?)`;

          db.query(
            SQL,
            [userID, shopID, message, userID, date, propertyID],
            (error, data) => {
              if (error) {
                console.error(error);
                return;
              }
              const SQL = `SELECT * FROM messagesRealEstate WHERE sender_id=${userID} AND receiver_id=${shopID} AND property_id = ${propertyID} OR sender_id=${shopID} AND receiver_id=${userID} AND property_id = ${propertyID} `;

              db.query(SQL, (error, data) => {
                if (error) {
                  console.error(error);
                  return;
                }

                res.send(data);
              });
            }
          );
        }
      );
    } else {
      const SQL = `SELECT * from conversationsRealEstate WHERE sender_id = ${userID} AND receiver_id =${shopID} AND property_id = ${propertyID}  OR sender_id = ${shopID} AND receiver_id =${userID} AND property_id = ${propertyID} `;

      db.query(SQL, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const count = Number(result[0].count);
        console.log(result);
        const id = result[0].id;
        const SQL = `UPDATE conversationsRealEstate SET  message = \'${message}\', count = ${
          count + 1
        } WHERE id = ${id}`;

        db.query(SQL, (error, result) => {
          if (error) {
            console.error(error);
            return;
          }
          const SQL = `INSERT INTO messagesRealEstate (sender_id,receiver_id,message,creator_id,date,property_id)VALUES(?,?,?,?,?,?)`;

          db.query(
            SQL,
            [userID, shopID, message, userID, date, propertyID],
            (error, data) => {
              if (error) {
                console.error(error);
                return;
              }
              const SQL = `SELECT * FROM messagesRealEstate WHERE sender_id=${userID} AND receiver_id=${shopID} AND property_id = ${propertyID} OR sender_id=${shopID} AND receiver_id=${userID} AND property_id = ${propertyID} `;

              db.query(SQL, (error, data) => {
                if (error) {
                  console.error(error);
                  return;
                }

                res.send(data);
              });
            }
          );
        });
      });
    }
  });
});

const messengerRealEstate = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const SQL = `SELECT logo,name,message,sender_id,receiver_id,conversationsRealEstate.updated_at,conversationsRealEstate.property_id FROM shops INNER JOIN conversationsRealEstate ON conversationsRealEstate.receiver_id=shops.user_id AND conversationsRealEstate.sender_id = ${userID}`;
  //const SQL =   `SELECT logo,name,message FROM shops INNER JOIN messages ON messages.receiver_id=shops.user_id AND messages.sender_id = ${userID}`;
  db.query(SQL, (error, data) => {
    if (error) {
      console.error(error);
      res.send("Error Quering database").status(401);
    }
    //const result = data.filter((d)=>d)
    res.send(data);
  });
});

const getmessagesRealEstate = asyncHandler(async (req, res, next) => {
  const { userID, shopID, propertyID } = req.body;
  let messageData;
  let propertyData;
  const SQL = `SELECT * FROM messagesRealEstate WHERE sender_id=${userID} AND receiver_id=${shopID} AND property_id = ${propertyID} OR sender_id=${shopID} AND receiver_id=${userID} AND property_id = ${propertyID} `;

  db.query(SQL, (error, data) => {
    if (error) {
      console.error(error);
      res.send("Error Quering database").status(401);
    }
    messageData = data;
    const SQL = `SELECT * FROM realEstateProduct WHERE id = ${propertyID} `;

    db.query(SQL, (error, result) => {
      if (error) {
        console.error(error);
        res.send("Error Quering database").status(401);
      }
      propertyData = result;

      res
        .status(201)
        .json({ messageData: messageData, propertyData: propertyData });
    });
  });
});

const getMyFavorites = asyncHandler(async (req, res, next) => {
  const userID = req.body.userID;
  const SQL = `SELECT * FROM realEstateProduct INNER JOIN favoriteRealEstate ON realEstateProduct.id = favoriteRealEstate.property_id AND favoriteRealEstate.user_id = ${userID}  `;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.status(201).send(result);
    }
  });
});

const getAllProperties = asyncHandler(async (req, res, next) => {
  const userID = req.body.userID;
  const SQL = `SELECT * FROM realEstateProduct`;
  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.status(201).send(result);
    }
  });
});

const getUsersRealEstate = asyncHandler(async (req, res, next) => {
  const userID = req.body.userID;
  const SQL = `SELECT * FROM users WHERE id = ${userID}`;
  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(result);
    }
  });
});

const SetNotificationSettings = asyncHandler(async (req, res, next) => {
  const { userID, pushNotification, emailNotification } = req.body;
  console.log(emailNotification);
  console.log(pushNotification);
  const SQL = `UPDATE users SET  realEstatePushNotification = \'${pushNotification}\', realEstateEmailNotification = \'${emailNotification}\' WHERE id = ${userID}`;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      const SQL = `SELECT * FROM users WHERE id = ${userID}`;
      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          //res.status(201).send(result);
        }
      });
    }
  });
});

module.exports = {
  SetNotificationSettings,
  getUsersRealEstate,
  getAllProperties,
  getMyAds,
  deleteAdsPost,
  markAdsPost,
  getAds,
  addToFavorite,
  getSellerDetails,
  createmessage,
  messengerRealEstate,
  getmessagesRealEstate,
  getMyFavorites,
};
